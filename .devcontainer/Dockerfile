ARG VARIANT="focal"
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}

# Install needed packages and setup non-root user. Use a separate RUN statement to add your own dependencies.
RUN apt-get update \
    # Install dependencies
    && apt-get install -y build-essential fish autojump curl git unzip libssl-dev automake autoconf libncurses5-dev

ENV LC_ALL en_US.UTF-8

# RUN apt-get install -y wget gnupg2 inotify-tools locales && \
#     locale-gen en_US.UTF-8 && \ 
#     wget https://packages.erlang-solutions.com/erlang-solutions_2.0_all.deb && \ 
#     dpkg -i erlang-solutions_2.0_all.deb && \
#     apt-get update -y && \
#     DEBIAN_FRONTEND=noninteractive apt-get install -y erlang-dev erlang-parsetools elixir erlang-dialyzer erlang-edoc

SHELL ["/bin/bash", "-c"]
RUN git config --global advice.detachedHead false

RUN git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.8.1 \
    && mkdir -p ~/.config/fish/ \
    && echo "source ~/.asdf/asdf.fish" >> ~/.config/fish/config.fish \ 
    && echo ". $HOME/.asdf/asdf.sh" >> ~/.bashrc \
    && mkdir -p ~/.config/fish/completions \ 
    && ln -s ~/.asdf/completions/asdf.fish ~/.config/fish/completions

ENV PATH="~/.asdf/bin:${PATH}"

RUN asdf plugin-add nodejs https://github.com/asdf-vm/asdf-nodejs.git 
RUN asdf install nodejs 14.15.1
RUN asdf global nodejs 14.15.1
RUN asdf reshim nodejs

# ugh
RUN ~/.asdf/shims/npm install

CMD ["/bin/bash", "-c"]