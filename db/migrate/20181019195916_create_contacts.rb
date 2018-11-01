class CreateContacts < ActiveRecord::Migration[5.2]
  def change
    create_table :contacts do |t|
      t.string :date_vol
      t.string :nb_pax
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
