class AddAeronefToAd < ActiveRecord::Migration
  def change
    add_reference :ads, :aeronef, index: true, foreign_key: true
  end
end
