## usersテーブル 

|Column|Type|Options|
|------|----|-------| 
|user_name|string|null: false, unique: true, index: true|
|user_email|string|null: false, unique: true|

### Assocition  
- has_many :groups, through::group_users 
- has_many :group_users
- has_many :massages

## groupsテーブル 
|Column|Type|Options|
|------|----|-------| 
|group_name|string|null: false, unique:true|


### Assocition 
- has_many :users, through::group_users
- has_many :group_users 
- has_many :messages

## messagesテーブル  
|Column|Type|Options|
|------|----|-------| 
|body|text|null:false|
|image|string|
|group|references|foreign_key:true|
|user|references|foreign_key:true|

### Assocition 
- belongs_to :group
- belongs_to :user



## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association

- belongs_to :group
- belongs_to :user


