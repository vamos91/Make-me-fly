class RenameCategoryToClasse < ActiveRecord::Migration
  def change
        rename_column :aeronefs, :category, :classe
  end
end
