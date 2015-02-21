desc "Deploy app to a specific remote"
task :deploy, :remote do |t, args|
  if args[:remote].nil?
    puts "Requires remote parameter."
  else
    branches = `git branch`.split
    deploy_version = Time.new().strftime("%Y-%m-%d")

    # Filter out unnecessary branches
    branches.select! { |branch| branch.starts_with?("deploy/#{deploy_version}") }
   	
		suffixes ||=[]
		for branch in branches
			suffixes << branch.split("_")[-1].to_i
		end

		suffixes.sort!
    # Update the deploy_version based on if there are any existing branches.
    deploy_version += if suffixes.length > 0
                        "_" + (suffixes[-1] + 1).to_s
                      elsif branches.length == 1
                        "_2"
                      else
                        ""
                      end

    # Run commands:
    current_branch = `git rev-parse --abbrev-ref HEAD`
    `git diff-files --quiet`
    has_changes = $?.to_i != 0

    `git stash` if has_changes
    `git checkout master`
    `git checkout -b deploy/#{deploy_version}`
    puts "Generating client.."
    `rake client`
    `git add -f public`
    `git commit -m "Deploy for #{args[:remote]} #{deploy_version}."`
    puts "Deploying.."
    `git push -f #{args[:remote]} HEAD:master`
    puts "Deployed to #{args[:remote]}."
    `git checkout #{current_branch}`
    `git stash pop` if has_changes

  end
end
