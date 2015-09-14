class FriendEmailAddressesToUsers < ActiveRecord::Migration
  def change
    add_column :users, :email_address_recipients, :string
  end
end
