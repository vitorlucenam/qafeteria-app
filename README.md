# QAfeteria - React Native App

Uma aplicação React Native desenvolvida seguindo os princípios do **Atomic Design** com TypeScript, focada em acessibilidade e automação de testes.

## 📋 Índice

- [Estrutura do Projeto](#estrutura-do-projeto)
- [Arquitetura e Design](#arquitetura-e-design)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Como Executar](#como-executar)
- [Builds e Deploy](#builds-e-deploy)
- [Testes de Automação](#testes-de-automação)
- [Accessibility IDs](#accessibility-ids)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── atoms/              # Componentes básicos
│   │   ├── Button.tsx
│   │   ├── InputField.tsx
│   │   ├── Toast.tsx
│   │   └── index.js
│   ├── molecules/          # Componentes compostos
│   │   ├── LoginForm.tsx
│   │   ├── WelcomeMessage.tsx
│   │   └── index.js
│   ├── organisms/          # Seções complexas
│   ├── templates/          # Layouts de página
│   └── index.js
├── pages/                  # Telas da aplicação
│   ├── LoginScreen.tsx
│   ├── HomeScreen.tsx
│   └── index.js
├── navigation/             # Configuração de navegação
│   ├── AppNavigator.tsx
│   └── index.ts
├── types/                  # Definições TypeScript
│   ├── auth.ts
│   ├── navigation.ts
│   └── index.ts
├── config/                 # Configurações da aplicação
│   └── auth.ts
├── utils/                  # Funções utilitárias
└── index.js
```

## 🎨 Arquitetura e Design

### Atomic Design

O projeto foi estruturado seguindo a metodologia **Atomic Design**, que organiza os componentes em uma hierarquia clara:

1. **Atoms** (Átomos): Componentes básicos e indivisíveis
   - `Button`: Botão com estados de loading, variantes e acessibilidade
   - `InputField`: Campo de entrada com validação visual e estados de erro
   - `Toast`: Notificações animadas com diferentes tipos

2. **Molecules** (Moléculas): Componentes compostos por átomos
   - `LoginForm`: Formulário de login com validação
   - `WelcomeMessage`: Mensagem de boas-vindas personalizada

3. **Organisms** (Organismos): Seções complexas da interface
4. **Templates**: Layouts de página
5. **Pages**: Páginas completas da aplicação

### Princípios de Design

- **Acessibilidade**: Todos os componentes possuem labels, roles e hints adequados
- **Testabilidade**: Accessibility IDs em todos os elementos para automação
- **Tipagem**: TypeScript rigoroso em toda a aplicação
- **Responsividade**: Interface adaptável a diferentes tamanhos de tela
- **Experiência do Usuário**: Feedbacks visuais, estados de loading e validações

## ⚙️ Configuração do Ambiente

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- React Native CLI (para builds nativos)
- Android Studio (para Android)
- Xcode (para iOS)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/qafeteria.git
cd qafeteria

# Instale as dependências
npm install
# ou
yarn install

# Para desenvolvimento com Expo
npm install -g @expo/cli
```

## 🚀 Como Executar

### Desenvolvimento com Expo

```bash
# Inicie o servidor de desenvolvimento
expo start

# Para executar no iOS
expo start --ios

# Para executar no Android
expo start --android

# Para executar na web
expo start --web
```

### Desenvolvimento Nativo

```bash
# iOS
npx react-native run-ios

# Android
npx react-native run-android
```

## 📱 Builds e Deploy

### Scripts Disponíveis

```bash
# Desenvolvimento
npm start                    # Inicia o servidor Expo
npm run start:clear         # Inicia com cache limpo
npm run start:tunnel        # Inicia com túnel para dispositivos físicos

# Execução em dispositivos/emuladores
npm run android             # Executa no Android
npm run ios                # Executa no iOS
npm run web                # Executa na web
npm run android:device     # Executa em dispositivo Android físico
npm run ios:device         # Executa em dispositivo iOS físico
npm run android:emulator   # Executa no emulador Android
npm run ios:simulator      # Executa no simulador iOS

# Builds com EAS
npm run build:android:debug    # Build debug Android
npm run build:ios:debug       # Build debug iOS
npm run build:android:release # Build release Android
npm run build:ios:release     # Build release iOS
npm run build:all:debug       # Build debug para ambas plataformas
npm run build:all:release     # Build release para ambas plataformas

# Build nativo local
npm run prebuild              # Gera código nativo
npm run prebuild:clean       # Gera código nativo limpo
npm run run:android          # Executa build nativo Android
npm run run:ios             # Executa build nativo iOS
npm run run:android:debug   # Executa build debug Android
npm run run:ios:debug       # Executa build debug iOS

# Instalação em dispositivos
npm run install:android     # Instala APK no dispositivo Android
npm run install:ios        # Instala no simulador iOS

# Qualidade de código
npm test                   # Executa testes
npm run test:watch        # Executa testes em modo watch
npm run test:coverage     # Executa testes com cobertura
npm run lint              # Verifica linting
npm run lint:fix         # Corrige problemas de linting
npm run type-check       # Verifica tipos TypeScript

# Utilitários
npm run doctor           # Verifica problemas na configuração
npm run upgrade         # Atualiza dependências do Expo
```

### Pré-requisitos para Builds

#### Para Android
```bash
# Instale o Android Studio
# Configure as variáveis de ambiente:
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

#### Para iOS
```bash
# Instale o Xcode via App Store
# Instale as ferramentas de linha de comando:
xcode-select --install

# Instale CocoaPods
sudo gem install cocoapods
```

### Build de Debug

```bash
# Preparar projeto (primeira vez)
npm run prebuild

# Android Debug
npm run build:android:debug
# ou build local
npm run run:android:debug

# iOS Debug  
npm run build:ios:debug
# ou build local
npm run run:ios:debug
```

### Build de Produção

```bash
# Android Release (requer configuração EAS)
npm run build:android:release

# iOS Release (requer configuração EAS)
npm run build:ios:release

# Build para ambas plataformas
npm run build:all:release
```

### Configurações de Build

O arquivo `app.config.js` contém configurações específicas para builds de debug e teste:

- **Android**: Keystore de debug habilitado
- **iOS**: Configurações de desenvolvimento team
- **Permissões**: Configuradas para testes de automação
- **Acessibilidade**: Habilitada por padrão

## 🧪 Testes de Automação

### Configuração do Appium

```javascript
// Configuração para iOS
const iosConfig = {
  platformName: 'iOS',
  platformVersion: '16.0',
  deviceName: 'iPhone 14',
  app: './ios/build/Build/Products/Debug-iphonesimulator/QAfeteria.app',
  automationName: 'XCUITest'
};

// Configuração para Android
const androidConfig = {
  platformName: 'Android',
  platformVersion: '12',
  deviceName: 'Android Emulator',
  app: './android/app/build/outputs/apk/debug/app-debug.apk',
  automationName: 'UiAutomator2'
};
```

### Configuração do Espresso (Android)

```kotlin
// build.gradle (app)
dependencies {
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
    androidTestImplementation 'androidx.test:runner:1.5.2'
    androidTestImplementation 'androidx.test:rules:1.5.0'
}
```

### Configuração do XCUITest (iOS)

```swift
// No Xcode, adicione XCUITest framework ao target de teste
import XCTest

class QAfeteriaUITests: XCTestCase {
    var app: XCUIApplication!
    
    override func setUp() {
        super.setUp()
        app = XCUIApplication()
        app.launch()
    }
}
```

## 🔍 Accessibility IDs

### LoginScreen

| Elemento | Test ID | Descrição |
|----------|---------|-----------|
| Tela Principal | `login-screen` | Container da tela de login |
| Título | `login-title` | Título "QAfeteria" |
| Subtítulo | `login-subtitle` | Subtítulo "Faça login para continuar" |
| Formulário | `login-form` | Container do formulário |
| Campo Email | `login-form-email-input` | Campo de entrada do email |
| Label Email | `login-form-email-input-label` | Label do campo email |
| Erro Email | `login-form-email-input-error` | Mensagem de erro do email |
| Campo Senha | `login-form-password-input` | Campo de entrada da senha |
| Label Senha | `login-form-password-input-label` | Label do campo senha |
| Erro Senha | `login-form-password-input-error` | Mensagem de erro da senha |
| Botão Login | `login-form-submit-button` | Botão de envio do formulário |
| Loading Login | `login-form-submit-button-loader` | Indicador de loading do botão |
| Mensagem Bloqueio | `login-blocked-message` | Mensagem de conta bloqueada |
| Dica Credenciais | `login-credentials-hint` | Dica das credenciais corretas |
| Toast | `login-toast` | Notificação toast |
| Toast Texto | `login-toast-text` | Texto da notificação |

### HomeScreen

| Elemento | Test ID | Descrição |
|----------|---------|-----------|
| Tela Principal | `home-screen` | Container da tela home |
| Mensagem Boas-vindas | `welcome-message` | Container da mensagem de boas-vindas |
| Saudação | `welcome-message-greeting` | Texto de saudação |
| Subtítulo | `welcome-message-subtitle` | Subtítulo "Bem-vindo de volta" |
| Último Login | `welcome-message-last-login` | Informação do último login |
| Badge Admin | `welcome-message-admin-badge` | Badge de administrador |
| Título Ações | `quick-actions-title` | Título "Ações Rápidas" |
| Botão Perfil | `profile-button` | Botão "Ver Perfil" |
| Botão Configurações | `settings-button` | Botão "Configurações" |
| Título Conta | `account-section-title` | Título "Conta" |
| Email Usuário | `user-email` | Email do usuário logado |
| Tipo Usuário | `user-role` | Tipo do usuário (Admin/Usuário) |
| Botão Logout | `logout-button` | Botão de logout |
| Toast Home | `home-toast` | Notificação toast da home |

### Exemplos de Uso

#### Appium (JavaScript)

```javascript
// Login Screen
const emailField = await driver.$('~login-form-email-input');
await emailField.setValue('vitor@app.com');

const passwordField = await driver.$('~login-form-password-input');
await passwordField.setValue('vitor123');

const loginButton = await driver.$('~login-form-submit-button');
await loginButton.click();

// Home Screen
const welcomeMessage = await driver.$('~welcome-message');
expect(await welcomeMessage.isDisplayed()).toBe(true);

const logoutButton = await driver.$('~logout-button');
await logoutButton.click();
```

#### Espresso (Kotlin)

```kotlin
// Login Screen
onView(withId(R.id.login_form_email_input))
    .perform(typeText("vitor@app.com"))

onView(withId(R.id.login_form_password_input))
    .perform(typeText("vitor123"))

onView(withId(R.id.login_form_submit_button))
    .perform(click())

// Home Screen
onView(withId(R.id.welcome_message))
    .check(matches(isDisplayed()))

onView(withId(R.id.logout_button))
    .perform(click())
```

#### XCUITest (Swift)

```swift
// Login Screen
let emailField = app.textFields["login-form-email-input"]
emailField.tap()
emailField.typeText("vitor@app.com")

let passwordField = app.secureTextFields["login-form-password-input"]
passwordField.tap()
passwordField.typeText("vitor123")

let loginButton = app.buttons["login-form-submit-button"]
loginButton.tap()

// Home Screen
let welcomeMessage = app.otherElements["welcome-message"]
XCTAssertTrue(welcomeMessage.exists)

let logoutButton = app.buttons["logout-button"]
logoutButton.tap()
```

## 🔐 Credenciais de Teste

Para testes de automação, utilize as seguintes credenciais:

- **Email**: `vitor@app.com`
- **Senha**: `vitor123`

## 🛠️ Tecnologias Utilizadas

- **React Native**: Framework principal
- **TypeScript**: Tipagem estática
- **Expo**: Plataforma de desenvolvimento
- **React Navigation**: Navegação entre telas
- **Atomic Design**: Metodologia de design
- **Accessibility**: Suporte completo a acessibilidade
- **Appium**: Automação de testes multiplataforma
- **Espresso**: Testes de UI Android
- **XCUITest**: Testes de UI iOS

## 📝 Fluxos de Teste

### Fluxo de Login

1. **Campos Vazios**: Validação de campos obrigatórios
2. **Email Inválido**: Validação de formato de email
3. **Senha Curta**: Validação de tamanho mínimo
4. **Credenciais Incorretas**: Sistema de tentativas limitadas
5. **Login Bem-sucedido**: Navegação para tela home
6. **Bloqueio de Conta**: Após 3 tentativas incorretas

### Fluxo de Home

1. **Exibição de Boas-vindas**: Mensagem personalizada
2. **Informações do Usuário**: Email e tipo de conta
3. **Ações Rápidas**: Botões funcionais com feedback
4. **Logout**: Confirmação e retorno ao login

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ para automação de testes e acessibilidade**