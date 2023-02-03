class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true
  validates :display_name, presence: true
  validates :type, presence: true
  validates :password, presence: true
end
