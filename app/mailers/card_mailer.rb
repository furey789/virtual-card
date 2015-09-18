class CardMailer < ApplicationMailer

  default to: ENV["GMAIL_USERNAME"],
    from: ENV["GMAIL_USERNAME"]

  def email_card(person,url)

    @name = person.first_name
    @url = url

    mail(to: person.email_address_recipients, subject: 'My new business card')

  end

end
