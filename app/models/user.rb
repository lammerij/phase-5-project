class User < ApplicationRecord
  has_secure_password
  has_one_attached :avatar
  validates :username, presence: true
  validates :display_name, presence: true
  validates :type, presence: true
  validates :password, presence: true


  end
end
