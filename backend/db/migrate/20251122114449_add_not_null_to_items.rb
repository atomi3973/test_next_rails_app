class AddNotNullToItems < ActiveRecord::Migration[7.2]
  def change
    change_column_null :items, :name, false
    change_column_null :items, :description, false
  end
end
