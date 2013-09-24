require 'fileutils'

desc "Build client JS app"
task :client do
  puts "Buidling with grunt ..."
  FileUtils.cd(Rails.root.join("client")) do
    puts `grunt build`
  end
end
