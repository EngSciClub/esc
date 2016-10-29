namespace :db do

  desc 'Seed admins'
  task :seed_admins => :environment do
    Admin.delete_all
    ActiveRecord::Base.connection.reset_pk_sequence! Admin.table_name

    Admin.create(email: 'barry.kl.fung@gmail.com', name: 'Barry Fung', authorized_routes: ['*'])
    Admin.create(email: 'judyshen.hw@gmail.com', name: 'Judy Shen', authorized_routes: ['*'])
    Admin.create(email: 'remo.reuben@gmail.com', name: 'Remo Reuben', authorized_routes: ['*'])
    Admin.create(email: 'hijun96@gmail.com', name: 'Jane Seo', authorized_routes: ['*'])
    Admin.create(email: 'danny.yz.zhang@gmail.com', name: 'Danny Zhang', authorized_routes: ['*'])
	
  end

end
