class CreateSocials < ActiveRecord::Migration[7.0]
  def change
    create_table :socials do |t|
      t.string :name
      t.text :external_url
      t.boolean :public
      t.integer :ordering, null: false
      t.timestamps
    end
  end
end
