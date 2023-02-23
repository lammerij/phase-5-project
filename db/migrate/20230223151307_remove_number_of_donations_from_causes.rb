class RemoveNumberOfDonationsFromCauses < ActiveRecord::Migration[7.0]
  def change
    remove_column :causes, :number_of_donations, :integer
  end
end
