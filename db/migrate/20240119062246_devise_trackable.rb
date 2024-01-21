class DeviseTrackable < ActiveRecord::Migration[7.0]
  def change
    ## Recoverable
    add_column :users, :allow_password_change, :boolean, :default => false
    
    add_index :users, :confirmation_token,   unique: true
    # add_index :users, :unlock_token,         unique: true

    # ## Trackable
    add_column :users, :sign_in_count, :integer, default: 0, null: false
    add_column :users, :current_sign_in_at, :datetime
    add_column :users, :last_sign_in_at, :datetime
    add_column :users, :current_sign_in_ip, :inet
    add_column :users, :last_sign_in_ip, :inet
  end
end
