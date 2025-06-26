# Guia de Desenvolvimento - QAfeteria

## 🚀 Comandos de Desenvolvimento

### Instalação e Configuração

```bash
# Instalar dependências
npm install

# Verificar configuração do ambiente
expo doctor

# Limpar cache (se necessário)
expo start --clear
```

### Executar em Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm start

# Iniciar com cache limpo
npm run start:clear

# Iniciar com tunnel (para dispositivos físicos em redes diferentes)
npm run start:tunnel

# Android no emulador
npm run android

# iOS no simulador
npm run ios

# Web
npm run web
```

### Executar em Dispositivos Físicos

```bash
# Android - dispositivo físico
npm run android:device

# iOS - dispositivo físico
npm run ios:device

# Ou usar os comandos básicos (detecta automaticamente)
npm run android
npm run ios
```

### Builds Debug

```bash
# Build Android Debug (APK)
npm run build:android:debug

# Build iOS Debug (Simulator)
npm run build:ios:debug

# Build para ambas as plataformas
npm run build:all:debug
```

### Builds de Produção

```bash
# Build Android Release (AAB)
npm run build:android:release

# Build iOS Release
npm run build:ios:release

# Build para ambas as plataformas
npm run build:all:release
```

### Desenvolvimento Nativo

```bash
# Gerar código nativo (prebuild)
npm run prebuild

# Gerar código nativo limpo
npm run prebuild:clean

# Executar no Android nativo
npm run run:android

# Executar no iOS nativo
npm run run:ios

# Executar com configuração específica
npm run run:android:debug
npm run run:ios:debug
```

### Instalação de APKs/Apps

```bash
# Instalar APK no dispositivo Android conectado
npm run install:android

# Instalar no simulador iOS
npm run install:ios
```

### Testes e Qualidade

```bash
# Executar testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com coverage
npm run test:coverage

# Verificar lint
npm run lint

# Corrigir problemas de lint
npm run lint:fix

# Verificar tipos TypeScript
npm run type-check
```

## 📱 Instruções para Dispositivos/Emuladores

### Android

#### Emulador Android

1. **Configurar Android Studio**:
   ```bash
   # Download Android Studio
   # Instalar Android SDK
   # Criar AVD (Android Virtual Device)
   ```

2. **Iniciar Emulador**:
   ```bash
   # Via Android Studio ou linha de comando
   emulator -avd Pixel_4_API_30
   ```

3. **Executar App**:
   ```bash
   npm run android
   ```

#### Dispositivo Android Físico

1. **Habilitar Debug USB**:
   - Configurações → Sobre o telefone → Tocar 7x em "Número da versão"
   - Configurações → Opções do desenvolvedor → Ativar "Depuração USB"

2. **Conectar Dispositivo**:
   ```bash
   # Verificar se dispositivo foi detectado
   adb devices
   ```

3. **Executar App**:
   ```bash
   npm run android:device
   ```

### iOS

#### Simulador iOS

1. **Instalar Xcode** (Mac apenas)

2. **Executar App**:
   ```bash
   npm run ios
   ```

#### Dispositivo iOS Físico

1. **Configurar Certificados**:
   - Abrir projeto no Xcode
   - Configurar Development Team
   - Configurar Bundle Identifier único

2. **Executar App**:
   ```bash
   npm run ios:device
   ```

## 🔧 Configurações Específicas para Automação

### Preparar para Appium

```bash
# Build debug para testes
npm run build:android:debug
npm run build:ios:debug

# Os arquivos estarão em:
# Android: ./android/app/build/outputs/apk/debug/app-debug.apk
# iOS: ./ios/build/Build/Products/Debug-iphonesimulator/QAfeteria.app
```

### Configurar Dispositivo para Testes

#### Android

```bash
# Habilitar configurações de desenvolvedor
adb shell settings put global animator_duration_scale 0
adb shell settings put global transition_animation_scale 0
adb shell settings put global window_animation_scale 0

# Desabilitar teclado virtual (opcional)
adb shell settings put secure show_ime_with_hard_keyboard 0
```

#### iOS

```bash
# Configurar simulador para testes
xcrun simctl boot "iPhone 14"
xcrun simctl install booted ./ios/build/Build/Products/Debug-iphonesimulator/QAfeteria.app
```

## 🐛 Troubleshooting

### Problemas Comuns

1. **Metro bundler não inicia**:
   ```bash
   npx react-native start --reset-cache
   ```

2. **Erro de dependências**:
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Problema com iOS Pods**:
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Problema com Android Gradle**:
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

### Limpar Builds

```bash
# Limpar cache do Expo
expo start --clear

# Limpar build Android
cd android && ./gradlew clean && cd ..

# Limpar build iOS
cd ios && xcodebuild clean && cd ..
```

## 📋 Checklist de Desenvolvimento

### Antes de Iniciar
- [ ] Node.js instalado (v18+)
- [ ] Expo CLI instalado
- [ ] Android Studio configurado (para Android)
- [ ] Xcode instalado (para iOS, Mac apenas)
- [ ] Dispositivos/emuladores funcionando

### Desenvolvimento
- [ ] `npm install` executado
- [ ] `expo doctor` sem erros
- [ ] App rodando em emulador/simulador
- [ ] Hot reload funcionando
- [ ] Accessibility IDs testados

### Antes de Commit
- [ ] `npm run lint` sem erros
- [ ] `npm run type-check` sem erros
- [ ] `npm test` passando
- [ ] Build debug funcionando
- [ ] Funcionalidades testadas manualmente

### Deploy/Release
- [ ] Versão atualizada em `package.json`
- [ ] Build de produção funcionando
- [ ] Testes de automação passando
- [ ] Documentação atualizada

## 📞 Suporte

Em caso de problemas:

1. Verificar [documentação oficial do Expo](https://docs.expo.dev/)
2. Executar `expo doctor` para diagnóstico
3. Consultar logs com `expo logs`
4. Verificar issues no repositório

---

**Happy Coding! 🚀**