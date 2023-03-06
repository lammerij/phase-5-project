class Donation < ApplicationRecord
  belongs_to :donor
  belongs_to :cause

  validates :amount, presence: true, numericality: { greater_than: 0 }
end
