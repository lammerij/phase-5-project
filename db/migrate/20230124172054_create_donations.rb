class CreateDonations < ActiveRecord::Migration[6.1]
  def change
    create_table :donations do |t|
      t.float :amount
      t.integer :fundraiser_id
      t.integer :donor_id

      t.timestamps
    end
  end
end
