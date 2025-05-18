The Use Case of Fly directmail
Básic version v1.0.0

-The system have 2 role “users” and “subscribes”, only users make crud of others users. with follow fields: username, password, name, lastname, phone, role, create_at.
- The users login with email and password.
- The persons sing up throught a form with follow fields: name, lastname, phone, email. the system timestamp current data.
- The system automaticaly send mail of confirmation for subscribe when someone person sing up, the all templates need have usubscribe function.
-The system uses storage mail template for sending when scheduleded, the template has fields: titleTemplate, subject, from, htmlBody, attachments, path, create_at .
- The system show a list with all subscribers and your infomations.
- The system storage a hostoric about all both mails sended, scheduledes and automaticaly fields: idTemplate, statusOfsent, dateOfsend, idPerson.
- The system sende notify admin when someone unsubscribe.
- The system send for email and password for when user forget login.


Perfect — thanks for the detailed information. Based on your description, I will now:

✅ Build the Entity-Relationship Model (MER)
📌 Entities & Attributes
1. User
Field	Type	Notes
id	INT (PK)	Primary key
email	VARCHAR	Login credential
password	VARCHAR	Hashed
username	VARCHAR	Display name / alias
name	VARCHAR	
lastname	VARCHAR	
phone	VARCHAR	Optional
role	ENUM	user or admin
created_at	TIMESTAMP	Auto-filled on creation

2. Subscriber
Field	Type	Notes
id	INT (PK)	
name	VARCHAR	
lastname	VARCHAR	
phone	VARCHAR	Optional
email	VARCHAR	Unique
subscribed_at	TIMESTAMP	Auto-filled on signup
is_active	BOOLEAN	true unless unsubscribed

3. Template
Field	Type	Notes
id	INT (PK)	
title	VARCHAR	Title of the template
subject	VARCHAR	Subject of the email
from_email	VARCHAR	Sender
html_body	TEXT	Full email body in HTML
attachments	TEXT/JSON	File paths / attachment names
path	VARCHAR	Directory for assets
created_at	TIMESTAMP	Creation date

4. MailHistory
Field	Type	Notes
id	INT (PK)	
template_id	FK → Template(id)	
subscriber_id	FK → Subscriber(id)	
status	ENUM	scheduled, sent, failed
date_sent	DATETIME	Nullable if not yet sent

5. UnsubscribeLog
Field	Type	Notes
id	INT (PK)	
subscriber_id	FK → Subscriber(id)	
date	TIMESTAMP	When unsubscribed
notified	BOOLEAN	Whether admin was notified

6. PasswordResetRequest
Field	Type	Notes
id	INT (PK)	
user_id	FK → User(id)	
token	VARCHAR	Reset token
expires_at	DATETIME	Expiration time
used	BOOLEAN	To prevent reuse

🔗 Relationships
User (1) ↔ (N) Template → a user can create many templates

Subscriber (1) ↔ (N) MailHistory → one subscriber receives many mails

Template (1) ↔ (N) MailHistory → one template can be used in many sends

Subscriber (1) ↔ (0/1) UnsubscribeLog → optional if unsubscribed

User (1) ↔ (N) PasswordResetRequest → for password recovery

📊 MER Diagram (Text Layout)
pgsql
Copy
Edit
User
 ├── id (PK)
 ├── email
 ├── password
 ├── username
 ├── name
 ├── lastname
 ├── phone
 ├── role
 └── created_at

Subscriber
 ├── id (PK)
 ├── name
 ├── lastname
 ├── phone
 ├── email
 ├── subscribed_at
 └── is_active

Template
 ├── id (PK)
 ├── title
 ├── subject
 ├── from_email
 ├── html_body
 ├── attachments
 ├── path
 └── created_at

MailHistory
 ├── id (PK)
 ├── template_id → Template.id
 ├── subscriber_id → Subscriber.id
 ├── status
 └── date_sent

UnsubscribeLog
 ├── id (PK)
 ├── subscriber_id → Subscriber.id
 ├── date
 └── notified

PasswordResetRequest
 ├── id (PK)
 ├── user_id → User.id
 ├── token
 ├── expires_at
 └── used
