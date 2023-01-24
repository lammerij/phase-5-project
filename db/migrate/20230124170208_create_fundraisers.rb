class CreateFundraisers < ActiveRecord::Migration[6.1]
  def change
    create_table :fundraisers do |t|
      t.string :name
      t.text :description
      t.integer :cause_id
      t.integer :donation_id
      t.integer :number_of_donations
      t.float :amount_raised
      t.float :amount_needed
      t.datetime :time_remaining

      t.timestamps
    end
  end
end
