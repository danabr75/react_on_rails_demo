class CreateMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :members do |t|
      t.string :first_name
      t.string :last_name
      t.boolean :public
      t.integer :ordering, null: false
      t.timestamps
    end
  end
end
