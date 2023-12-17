```mermaid
erDiagram

  "Users" {
    String id "🗝️"
    String login_id 
    String password 
    DateTime created_at 
    DateTime updated_at 
    }
  

  "Characters" {
    Int id "🗝️"
    String name 
    String model_name 
    String description 
    Int type 
    DateTime created_at 
    DateTime updated_at 
    }
  

  "CharactersUsers" {
    String character_name 
    Int nostalgicLevel 
    }
  
    "Users" o{--}o "CharactersUsers" : "characters_users"
    "Characters" o{--}o "CharactersUsers" : "characters_users"
    "CharactersUsers" o|--|| "Users" : "user"
    "CharactersUsers" o|--|| "Characters" : "character"
```
