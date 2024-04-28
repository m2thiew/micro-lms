# docker build -t debian-server --build-arg USER=$(id -nu) --build-arg UID=$(id -u) --build-arg GID=$(id -g) .
FROM debian:bullseye-20231218

ENV DEBIAN_FRONTEND=noninteractive

RUN --mount=type=cache,target=/var/cache/apt \
    --mount=type=cache,target=/var/lib/apt/lists \
    --mount=type=tmpfs,target=/tmp \
    --mount=source=./mysql.gpg,target=/docker/mysql.gpg \
    <<EOF
    set -e

    # programmi basi usati negli script per installare altri programmi
    apt-get update
    apt-get install -y --no-install-recommends ca-certificates gnupg curl wget lsb-release apt-transport-https

    # configurazione installazione node 20 lts
    mkdir -p /etc/apt/keyrings
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
    NODE_MAJOR=20
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list

    # configurazione installazione GitHub cli
    (curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg)
    chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
    (echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null)

    # configurazione Installazione MySql
    mkdir -p /usr/local/share/keyrings/
    cp /docker/mysql.gpg /usr/local/share/keyrings/mysql.gpg
    chmod go+r /usr/local/share/keyrings/mysql.gpg
    (echo "deb [signed-by=/usr/local/share/keyrings/mysql.gpg] http://repo.mysql.com/apt/debian/ bullseye mysql-8.0" | tee /etc/apt/sources.list.d/mysql.list)

    # installazione di tutti i programmi
    apt-get update
    apt-get install -y --no-install-recommends nodejs gh mysql-client \
        htop zip unzip ssh vim bash-completion xz-utils rsync procps sudo git git-lfs socat xz-utils
EOF

# programmi basi usati negli script per installare altri programmi
# RUN apt-get update && \
#     apt-get install -y ca-certificates gnupg curl wget lsb-release apt-transport-https

# # installazione node 20 lts
# RUN mkdir -p /etc/apt/keyrings && \
#     curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
#     NODE_MAJOR=20 && \
#     echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
#     apt-get update && \
#     apt-get install -y nodejs

# # installazione GitHub cli
# RUN (curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg) && \
#     chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg && \
#     (echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null) && \
#     apt-get update && \
#     apt-get install -y gh

# # Installazione MySql
# ADD mysql.gpg /usr/local/share/keyrings/mysql.gpg
# RUN chmod go+r /usr/local/share/keyrings/mysql.gpg && \
#     (echo "deb [signed-by=/usr/local/share/keyrings/mysql.gpg] http://repo.mysql.com/apt/debian/ bullseye mysql-8.0" | tee /etc/apt/sources.list.d/mysql.list) && \
#     apt-get update && \
#     apt-get install -y mysql-client

# # installazione di altri programmi basilari
# RUN apt-get update && \
#     apt-get install -y htop zip unzip ssh vim bash-completion xz-utils rsync procps sudo git git-lfs socat xz-utils

# # Pulizia
# RUN apt-get clean && \
#     rm -rf /var/lib/apt/lists/*

# creazione utente per sviluppo
RUN adduser --gecos '' dev && \
    (echo 'dev   ALL=(ALL:ALL) NOPASSWD:ALL' | tee /etc/sudoers.tmp) && \
    visudo -c -f /etc/sudoers.tmp && \
    cp /etc/sudoers.tmp /etc/sudoers && \
    (echo 'set mouse=""' | tee -a /etc/vim/vimrc) && \
    (echo 'set ttymouse=""' | tee -a /etc/vim/vimrc) && \
    echo 'PS1='\''\[\033]0;$TITLEPREFIX:$PWD\007\]\n\[\033[32m\]\u@\h \[\033[35m\]\[\033[33m\]\w\[\033[36m\]`__git_ps1`\[\033[0m\]\n$ '\' >> /home/dev/.bashrc && \
    (npm completion | tee -a /home/dev/.bashrc)

# setup cartella di lavoro
RUN mkdir /var/app
VOLUME /var/app
WORKDIR /var/app

# il container non userà l'utente root di default
USER dev

CMD ["/bin/sh", "-c", "exec sleep infinity"]