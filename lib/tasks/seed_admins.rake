namespace :db do

  desc 'Seed admins'
  task :seed_admins => :environment do
    Admin.delete_all
    ActiveRecord::Base.connection.reset_pk_sequence! Admin.table_name

    Admin.create(email: 'johnyuhanliu@gmail.com', name: 'John Liu', authorized_routes: ['*'])
    Admin.create(email: 'sharonravindran1993@gmail.com', name: 'Sharon Ravindran', authorized_routes: ['*'])
    Admin.create(email: 't.brian.bt@gmail.com', name: 'Brian To', authorized_routes: ['*'])
    Admin.create(email: 's1005rung@gmail.com', name: 'Stuti Rungee', authorized_routes: ['*'])
    Admin.create(email: 'jennakhamis@gmail.com', name: 'Jenna Khamis', authorized_routes: ['*'])
    Admin.create(email: 'cat.solis1@gmail.com', name: 'Catherine Solis', authorized_routes: ['*'])
    Admin.create(email: 'rossdancraig@gmail.com', name: 'Rossdan Craig', authorized_routes: ['*'])
    Admin.create(email: 'mindam.kenny@gmail.com', name: 'Kenny Kim', authorized_routes: ['*'])
    Admin.create(email: 'ollie.liang@gmail.com', name: 'Oliver Liang', authorized_routes: ['*'])
    Admin.create(email: 'kurtis.martin.sturmey@gmail.com', name: 'Kurtis Martin-Sturmey', authorized_routes: ['*'])
  end

end
