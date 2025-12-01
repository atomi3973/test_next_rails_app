class AuthController < ApplicationController
  require 'google-id-token'

  def google
    validator = GoogleIDToken::Validator.new

    begin
      payload = validator.check(params[:id_token], ENV['GOOGLE_CLIENT_ID'])
      user = User.find_or_create_by(email: payload['email']) do |u|
        u.name = payload['name']
      end

      token = JWT.encode({ user_id: user.id, email: user.email }, Rails.application.secret_key_base, 'HS256')

      render json: { jwt: token, user: { id: user.id, name: user.name, email: user.email } }
    rescue GoogleIDToken::ValidationError => e
      render json: { error: e.message }, status: :unauthorized
    end
  end
end