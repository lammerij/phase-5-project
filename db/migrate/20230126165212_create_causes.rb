class CreateCauses < ActiveRecord::Migration[6.1]
  def change
    create_table :causes do |t|
      t.text :name
      t.string :organization
      t.text :description
      t.integer :number_of_donations
      t.float :amount_raised
      t.float :amount_needed
      t.datetime :time_remaining
      t.references :organizer

      t.timestamps
    end
  end
end
