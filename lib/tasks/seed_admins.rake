namespace :db do

  desc 'Seed admins'
  task :seed_admins => :environment do
    Admin.delete_all
    ActiveRecord::Base.connection.reset_pk_sequence! Admin.table_name

    Admin.create(email: 'barry.kl.fung@gmail.com', name: 'Barry Fung', authorized_routes: ['*'])
    Admin.create(email: 'mindam.kenny@gmail.com', name: 'Kenny Kim', authorized_routes: ['*'])
    Admin.create(email: 'rossdancraig@gmail.com', name: 'Rossdan Craig', authorized_routes: ['*'])
    Admin.create(email: 'hijun96@gmail.com', name: 'Jane Seo', authorized_routes: ['*'])
    Admin.create(email: 'luhar.nadnahc@gmail.com', name: 'Rahul Chandan', authorized_routes: ['*'])
    Admin.create(email: 'matthewjustinlee@gmail.com', name: 'Matthew Lee', authorized_routes: ['*'])
    Admin.create(email: 'cyang1130@gmail.com', name: 'Charlie Yang', authorized_routes: ['*'])
    Admin.create(email: 'safalman12@gmail.com', name: 'Salman Khan', authorized_routes: ['*'])
    Admin.create(email: 'steveo9976@gmail.com', name: 'Stephen Xu', authorized_routes: ['*'])
    Admin.create(email: 'dudewiththeattitude@gmail.com', name: 'Emerson Grabke', authorized_routes: ['*'])
    Admin.create(email: 'sharonravindran1993@gmail.com', name: 'Sharon Ravindran', authorized_routes: ['*'])
		Admin.create(email: 'isyed.kamran@gmail.com', name: 'Syed Kamran', authorized_routes: ['*'])

  end

end
