class CreateAeronefs < ActiveRecord::Migration
  def change
    create_table :aeronefs do |t|
      t.string :type
      t.string :nom
      t.string :cylindre
      t.string :annee
      t.string :vitesse
      t.text :equipement
      t.string :autonomie
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
