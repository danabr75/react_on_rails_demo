class CreateRoles < ActiveRecord::Migration[7.0]
  def change
    create_table :roles do |t|
      t.string :name
      t.timestamps
    end

    create_table :user_roles do |t|
      t.references :user
      t.references :role
      t.timestamps
    end
  end
end
