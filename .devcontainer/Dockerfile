FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:14

ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Alter node user as needed, install tslint, typescript. eslint is installed by javascript image
RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then \
        groupmod --gid $USER_GID $USERNAME \
        && usermod --uid $USER_UID --gid $USER_GID $USERNAME \
        && chmod -R $USER_UID:$USER_GID /home/$USERNAME \
        && chmod -R $USER_UID:root /usr/local/share/nvm /usr/local/share/npm-global; \
    fi \
    #
    # Install tslint, typescript. eslint is installed by javascript image
    && sudo -u ${USERNAME} npm install -g tslint typescript

