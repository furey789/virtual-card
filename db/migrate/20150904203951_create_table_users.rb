class CreateTableUsers < ActiveRecord::Migration
  def change
    create_table :table_users do |t|
    end
    drop_table :table_users
  end
end
