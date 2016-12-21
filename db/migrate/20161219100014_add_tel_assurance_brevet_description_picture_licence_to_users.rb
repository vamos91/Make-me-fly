class AddTelAssuranceBrevetDescriptionPictureLicenceToUsers < ActiveRecord::Migration
  def change
    add_column :users, :tel, :string
    add_column :users, :assurance, :string
    add_column :users, :brevet_pilote, :string
    add_column :users, :description, :string
    add_column :users, :picture_ulm_user, :string
    add_column :users, :licence_ulm, :string
  end
end
