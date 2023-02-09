class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :display_name, :type, :avatar

  def avatar
    rails_blob_path(object.avatar, only_path: true) if object.avatar.attached?
  end
end
