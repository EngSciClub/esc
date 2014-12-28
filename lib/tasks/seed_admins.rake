namespace :db do

  desc 'Seed admins'
  task :seed_admins => :environment do
    Admin.delete_all
    ActiveRecord::Base.connection.reset_pk_sequence! Admin.table_name

    Admin.create(email: 'barry.kl.fung@gmail.com', name: 'Barry Fung', authorized_routes: ['*'])
    Admin.create(email: 'mannianime@gmail.com', name: 'Amanda Aleong', authorized_routes: ['*'])
    Admin.create(email: 't.brian.bt@gmail.com', name: 'Brian To', authorized_routes: ['*'])
    Admin.create(email: 'mindam.kenny@gmail.com', name: 'Kenny Kim', authorized_routes: ['*'])
    Admin.create(email: 'judyshen.hw@gmail.com', name: 'Judy Shen', authorized_routes: ['*'])
    Admin.create(email: 'sean.hsieh1994@gmail.com', name: 'Sean Hsieh', authorized_routes: ['*'])
    Admin.create(email: 'crane.balthazar@gmail.com', name: 'Balthazar Crane', authorized_routes: ['*'])
    Admin.create(email: 'syhbyt@gmail.com', name: 'Sayeh Bayat', authorized_routes: ['*'])
  end

end
