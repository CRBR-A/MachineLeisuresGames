HTDOCS = htdocs
INDEX = $(HTDOCS)/index.html
SPRITES = sprites/*
SERVER = hhsw.de@ssh.strato.de:sites/proto/boo/
OPTIONS = \
	--recursive \
	--links \
	--update \
	--delete-after \
	--times \
	--compress

all: $(INDEX)
	rsync $(OPTIONS) $(HTDOCS)/* $(SERVER)

$(INDEX): $(SPRITES)
	cd $(HTDOCS) && \
		../bin/mkatlas ../$(SPRITES) | \
		../bin/patchatlas index.html && \
		sed -e "s_data:image/png;base64,[/+a-zA-Z0-9=]*_data:image/png;base64,$$(base64 atlas.png | tr -d '\n')_" < index.html > tmp.html && \
		mv tmp.html index.html && \
		rm atlas.png
