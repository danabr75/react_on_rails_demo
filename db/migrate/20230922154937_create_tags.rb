class CreateTags < ActiveRecord::Migration[6.1]
  def change
    create_table :tags do |t|
      t.string :name
      t.string :category
      t.timestamps
    end

    create_join_table :blogs, :tags
  end
end
