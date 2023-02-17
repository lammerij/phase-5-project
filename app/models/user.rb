class User < ApplicationRecord
  has_secure_password
  has_one_attached :image
  validates :username, presence: true, uniqueness: true, length: { minimum: 5 }
  validates :password, presence: true, :on => :create
  validates :display_name, presence: true, uniqueness: true, length: { minimum: 5 }
  validates :type, presence: true


end
