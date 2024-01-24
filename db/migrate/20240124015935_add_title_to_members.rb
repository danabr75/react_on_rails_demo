class AddTitleToMembers < ActiveRecord::Migration[7.0]
  def change
    add_column :members, :title, :string
    add_column :members, :alias, :string
  end
end
