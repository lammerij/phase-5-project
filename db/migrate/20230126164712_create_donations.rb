class CreateDonations < ActiveRecord::Migration[6.1]
  def change
    create_table :donations do |t|
      t.float :amount
      t.integer :cause_id
      t.references :donor

      t.timestamps
    end
  end
end
