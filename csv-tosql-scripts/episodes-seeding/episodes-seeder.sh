#!/bin/bash

# Nom du fichier CSV
csv_file="episodes.csv"

# Nom de la table dans la base de données
table_name="episodes"

# Colonnes de la table (dans le même ordre que dans le fichier CSV)
columns="podcast_id,id,no,title,description,spotify_uri,sound_quality_rating,content_quality_rating,created_at,updated_at"

# Commande pour la requête SQL
insert_query="INSERT INTO $table_name ($columns) VALUES "

line_number=0

# Lire le fichier CSV ligne par ligne
while IFS= read -r line; do
    ((line_number++))
    # Ignorer la première ligne (en-tête)
    if [[ "$line_number" == 1 ]]; then
        continue
    fi
    
    # Supprimer les guillemets des valeurs
    line=$(echo "$line" | sed 's/"//g')
    
    # Séparer les valeurs en utilisant la virgule comme délimiteur
    IFS=',' read -r podcast_id id no title description spotify_uri sound_quality_rating content_quality_rating created_at updated_at <<< "$line"
    
    # Formater les valeurs de chaque colonne pour les inclure dans la requête SQL
    values="($podcast_id, $id, $no, \"$title\", \"$description\", \"$spotify_uri\", $sound_quality_rating, $content_quality_rating, \"$created_at\", \"$updated_at\")"
    
    # Ajouter les valeurs formatées à la requête SQL
    insert_query="$insert_query$values,"
done < "$csv_file"

# Supprimer la virgule à la fin de la requête SQL et ajouter un point-virgule
insert_query="${insert_query%,};"

# Afficher la requête SQL générée
echo "$insert_query"
