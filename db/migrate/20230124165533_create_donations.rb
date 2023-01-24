class CreateDonations < ActiveRecord::Migration[6.1]
  def change
    create_table :donations do |t|
      t.floatfundraiser_id :amount
      t.integer :donor_id

      t.timestamps
    end
  end
end
