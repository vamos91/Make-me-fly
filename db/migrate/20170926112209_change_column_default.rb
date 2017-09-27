class ChangeColumnDefault < ActiveRecord::Migration
  def change
    change_column_default(:aeronefs, :photos, nil)
  end
end
