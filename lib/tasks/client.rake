require 'fileutils'

desc "Build client JS app"
task :client, :mode do |t, args|
	FileUtils.rm_rf Rails.root.join("public")

  if args[:mode] == 'link'
    puts "Creating symlink to distribution directory."
    FileUtils.symlink Rails.root.join("client", "dist"), Rails.root.join("public")
  end

  # Build the distribution.
  puts "Building production build with grunt."
  FileUtils.cd(Rails.root.join("client")) do
    puts `grunt build`
  end

  unless args[:mode] == 'link'
    puts "Moving production build to public directory."
    FileUtils.mv Rails.root.join("client", "dist"), Rails.root.join("public")
  end
end
