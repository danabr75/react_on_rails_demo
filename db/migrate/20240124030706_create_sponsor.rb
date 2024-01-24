class CreateSponsor < ActiveRecord::Migration[7.0]
  def change
    create_table :sponsors do |t|
      t.text :tagline
      t.string :name
      t.boolean :public
      t.integer :ordering, null: false
      t.timestamps
    end
  end
end
