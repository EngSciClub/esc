require 'fileutils'

desc "Build client JS app"
task :client do
	FileUtils.rm_rf Rails.root.join("public")
  puts "Buidling with grunt ..."
  FileUtils.cd(Rails.root.join("client")) do
    puts `grunt build`
  end
  FileUtils.mv Rails.root.join("client", "dist"), Rails.root.join("public")
end
