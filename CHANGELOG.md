# Changelog

## [1.10.0](https://github.com/GoogleCloudPlatform/avocano/compare/v1.9.0...v1.10.0) (2023-11-23)


### 🥑 Features

* Migrate from Container Registry to Artifact Registry ([#378](https://github.com/GoogleCloudPlatform/avocano/issues/378)) ([65020ac](https://github.com/GoogleCloudPlatform/avocano/commit/65020acf09d3a069a8c63def05b6f368e333b120))


### 🐞 Bug Fixes

* add an IAM check for permission propagation ([#397](https://github.com/GoogleCloudPlatform/avocano/issues/397)) ([351b1a0](https://github.com/GoogleCloudPlatform/avocano/commit/351b1a0804503b0fd50ae505d90bae32fbb292bd))
* **deps:** update js runtime ([#394](https://github.com/GoogleCloudPlatform/avocano/issues/394)) ([779d98a](https://github.com/GoogleCloudPlatform/avocano/commit/779d98ab305b5d6b1ed44d705dc9d35e55884374))
* pin google provider &lt; 5.0.0 ([#356](https://github.com/GoogleCloudPlatform/avocano/issues/356)) ([1ee9708](https://github.com/GoogleCloudPlatform/avocano/commit/1ee97084fdcc81aa7348f43e1e9347f554eb6cee))
* remove client-image building ([#391](https://github.com/GoogleCloudPlatform/avocano/issues/391)) ([b353e13](https://github.com/GoogleCloudPlatform/avocano/commit/b353e13ab3a522b9a57117993d46640f6c65e8a3))


### 📑 Documentation

* add cold start improvement suggestions ([#371](https://github.com/GoogleCloudPlatform/avocano/issues/371)) ([759170c](https://github.com/GoogleCloudPlatform/avocano/commit/759170c811b87329989db0e9c9341e90947b2554))


### 🧹 Chores

* add reference to jump start ([#346](https://github.com/GoogleCloudPlatform/avocano/issues/346)) ([c611179](https://github.com/GoogleCloudPlatform/avocano/commit/c611179ecf727f9ecf5729d9988e3e3130f6d7aa))
* **deps:** bump @babel/traverse from 7.23.0 to 7.23.2 in /client ([#374](https://github.com/GoogleCloudPlatform/avocano/issues/374)) ([8b4dc1e](https://github.com/GoogleCloudPlatform/avocano/commit/8b4dc1edd4432cd64232f0c49b256bf5d2515ed5))
* **deps:** update actions/checkout action to v4 ([#350](https://github.com/GoogleCloudPlatform/avocano/issues/350)) ([04855a6](https://github.com/GoogleCloudPlatform/avocano/commit/04855a623ec78510862badb69623ab5dc64b1d87))
* **deps:** update actions/setup-node action to v4 ([#379](https://github.com/GoogleCloudPlatform/avocano/issues/379)) ([c987e9d](https://github.com/GoogleCloudPlatform/avocano/commit/c987e9d58dae71732eae0bf0d1d400d8f06bf3d1))
* **deps:** update dependency @custom-elements-manifest/analyzer to ^0.9.0 ([#376](https://github.com/GoogleCloudPlatform/avocano/issues/376)) ([5708c5e](https://github.com/GoogleCloudPlatform/avocano/commit/5708c5ec886036d2d97fdd1f5f3f143756a67dec))
* **deps:** update dependency @open-wc/testing to v4 ([#400](https://github.com/GoogleCloudPlatform/avocano/issues/400)) ([1125dc6](https://github.com/GoogleCloudPlatform/avocano/commit/1125dc6feba2b9cb138623f55ef22cc580ffd677))
* **deps:** update dependency @web/test-runner to ^0.18.0 ([#393](https://github.com/GoogleCloudPlatform/avocano/issues/393)) ([03c4610](https://github.com/GoogleCloudPlatform/avocano/commit/03c461002b3a4dd2f575d3a2ddc2196bd399dc3e))
* **deps:** update github actions ([#348](https://github.com/GoogleCloudPlatform/avocano/issues/348)) ([fd6ff3b](https://github.com/GoogleCloudPlatform/avocano/commit/fd6ff3b5dca53c4460156c1f72a13d75b874274b))
* **deps:** update github actions ([#375](https://github.com/GoogleCloudPlatform/avocano/issues/375)) ([ad6a211](https://github.com/GoogleCloudPlatform/avocano/commit/ad6a2112573b9a21ea3d5fe95d37b2c810baa17c))
* **deps:** update hashicorp/setup-terraform action to v3 ([#392](https://github.com/GoogleCloudPlatform/avocano/issues/392)) ([d6380e0](https://github.com/GoogleCloudPlatform/avocano/commit/d6380e019a0155166bdcba2e2b4d67bcdb9c2630))
* **deps:** update javascript dependencies ([#373](https://github.com/GoogleCloudPlatform/avocano/issues/373)) ([09962ca](https://github.com/GoogleCloudPlatform/avocano/commit/09962ca9318e60e2317ddaff2e13c7b200730f6b))
* **deps:** update js build ([#347](https://github.com/GoogleCloudPlatform/avocano/issues/347)) ([2d5ba0e](https://github.com/GoogleCloudPlatform/avocano/commit/2d5ba0e96c71f9925b721c595b14744560954d39))
* **deps:** update js build ([#377](https://github.com/GoogleCloudPlatform/avocano/issues/377)) ([1e08cd2](https://github.com/GoogleCloudPlatform/avocano/commit/1e08cd28cf9df38e785fca28e71035f17adc737c))
* **deps:** update python docker tag to v3.12 ([#364](https://github.com/GoogleCloudPlatform/avocano/issues/364)) ([3b0fb18](https://github.com/GoogleCloudPlatform/avocano/commit/3b0fb1849bde6fe73af53db27e980ce1a6666af5))
* **deps:** update terraform google to v5 ([#365](https://github.com/GoogleCloudPlatform/avocano/issues/365)) ([a0c831d](https://github.com/GoogleCloudPlatform/avocano/commit/a0c831ddaa0dc7e7fa54539708a7768962d94028))

## [1.9.0](https://github.com/GoogleCloudPlatform/avocano/compare/v1.8.2...v1.9.0) (2023-07-20)


### 🥑 Features

* improve error messages on API failures ([#290](https://github.com/GoogleCloudPlatform/avocano/issues/290)) ([ef03957](https://github.com/GoogleCloudPlatform/avocano/commit/ef0395795cc8a255d83f3897adbd54b70cd77523))


### 🧹 Chores

* Add additional tests to cart logic ([#326](https://github.com/GoogleCloudPlatform/avocano/issues/326)) ([007f3f9](https://github.com/GoogleCloudPlatform/avocano/commit/007f3f99f866821c311add2df180909632180cfe))
* **deps:** update dependency @web/test-runner to ^0.17.0 ([#330](https://github.com/GoogleCloudPlatform/avocano/issues/330)) ([d6f126a](https://github.com/GoogleCloudPlatform/avocano/commit/d6f126a7cca23debd2fcc9fdeae9c46f42acdf4f))
* **deps:** update github actions ([#329](https://github.com/GoogleCloudPlatform/avocano/issues/329)) ([aa171d9](https://github.com/GoogleCloudPlatform/avocano/commit/aa171d9c42f1513944ff705a3e662cd7ec6e418e))
* **issue-194:** adding new tests for cart feature flag in product item component ([#305](https://github.com/GoogleCloudPlatform/avocano/issues/305)) ([b7b57a3](https://github.com/GoogleCloudPlatform/avocano/commit/b7b57a3cda965c5f59d3cad89aaa6d3e5c68773c))
* npm audit fix ([#315](https://github.com/GoogleCloudPlatform/avocano/issues/315)) ([d2587a5](https://github.com/GoogleCloudPlatform/avocano/commit/d2587a5a0680639583e1d65ff7d1e7fde6ae1d07))
* update licence headers ([#337](https://github.com/GoogleCloudPlatform/avocano/issues/337)) ([a9f6527](https://github.com/GoogleCloudPlatform/avocano/commit/a9f6527c68a51b3f694588043d335e496b3c2a0a))


### 🐞 Bug Fixes

* add headerlint ignore for [#290](https://github.com/GoogleCloudPlatform/avocano/issues/290) ([#310](https://github.com/GoogleCloudPlatform/avocano/issues/310)) ([b5c6de5](https://github.com/GoogleCloudPlatform/avocano/commit/b5c6de598fbd36423bdf9dfede2ca5e476498bdd))
* correct csrftoken promise issues ([#325](https://github.com/GoogleCloudPlatform/avocano/issues/325)) ([3ed044c](https://github.com/GoogleCloudPlatform/avocano/commit/3ed044c067afc0f2f6a4af4c1d0b4a384dd6e042))
* **deps:** update dependency @web/dev-server to ^0.3.0 ([#331](https://github.com/GoogleCloudPlatform/avocano/issues/331)) ([6f98992](https://github.com/GoogleCloudPlatform/avocano/commit/6f9899286aa523fe97cd79c9091037bcbed85a4b))
* Remove .txt files from requiring licence headers ([#341](https://github.com/GoogleCloudPlatform/avocano/issues/341)) ([a0a5119](https://github.com/GoogleCloudPlatform/avocano/commit/a0a51193eda49fd33610ae9d024fe7c750500f1a))
* remove autodiscovery for otel ([#307](https://github.com/GoogleCloudPlatform/avocano/issues/307)) ([e72330f](https://github.com/GoogleCloudPlatform/avocano/commit/e72330f944e7a30f5028dd30717930886e5b0c1e))
* replace googleapidiscovery with google-cloud-run ([#297](https://github.com/GoogleCloudPlatform/avocano/issues/297)) ([8afc2b9](https://github.com/GoogleCloudPlatform/avocano/commit/8afc2b99fd0be3c3e4a37277ef4447b9b7a38065))
* update release-please.json to update package-lock.json ([#313](https://github.com/GoogleCloudPlatform/avocano/issues/313)) ([25edd65](https://github.com/GoogleCloudPlatform/avocano/commit/25edd65180cd329ddf9f2dfe57966dc43dff565c))

## [1.8.2](https://github.com/GoogleCloudPlatform/avocano/compare/v1.8.1...v1.8.2) (2023-07-06)


### 🐞 Bug Fixes

* remove extra pipe from shell command ([#281](https://github.com/GoogleCloudPlatform/avocano/issues/281)) ([de41cd2](https://github.com/GoogleCloudPlatform/avocano/commit/de41cd275f6578306dd29b04f88babf3b6cf27ac))
* restore client annotation to cloud run service ([#293](https://github.com/GoogleCloudPlatform/avocano/issues/293)) ([89fa240](https://github.com/GoogleCloudPlatform/avocano/commit/89fa2409522012f18620a3ab46a8074cfa365f22))
* restore startup probe, 1s period ([#294](https://github.com/GoogleCloudPlatform/avocano/issues/294)) ([30db75f](https://github.com/GoogleCloudPlatform/avocano/commit/30db75fcd48f1149cae0eb44a2dd6394a1bc2fb6))
* support deployment suffix IDs to customise CSRF trusted domains ([#282](https://github.com/GoogleCloudPlatform/avocano/issues/282)) ([f987d94](https://github.com/GoogleCloudPlatform/avocano/commit/f987d945e9530224e45864ab76d37bd8646bd37b))


### 🧹 Chores

* **deps:** update dependency @open-wc/eslint-config to v11 ([#265](https://github.com/GoogleCloudPlatform/avocano/issues/265)) ([1188fbf](https://github.com/GoogleCloudPlatform/avocano/commit/1188fbf71199521491d27340a11a6f94a81c6354))
* **deps:** update dependency @open-wc/eslint-config to v12 ([#299](https://github.com/GoogleCloudPlatform/avocano/issues/299)) ([bf6c2c9](https://github.com/GoogleCloudPlatform/avocano/commit/bf6c2c9bb44ae93f085cc3c134860259877150ae))
* **deps:** update github actions ([#264](https://github.com/GoogleCloudPlatform/avocano/issues/264)) ([17ad288](https://github.com/GoogleCloudPlatform/avocano/commit/17ad28829496591eaaf60ba25c5fef99a9be602a))
* **deps:** update github actions ([#298](https://github.com/GoogleCloudPlatform/avocano/issues/298)) ([959e0e1](https://github.com/GoogleCloudPlatform/avocano/commit/959e0e11c88c216befecac0110b967582cbe28da))

## [1.8.1](https://github.com/GoogleCloudPlatform/avocano/compare/v1.8.0...v1.8.1) (2023-05-31)


### 🧹 Chores

* **deps:** update github actions ([#260](https://github.com/GoogleCloudPlatform/avocano/issues/260)) ([d65d050](https://github.com/GoogleCloudPlatform/avocano/commit/d65d050eadf7b0f0bd9ce698444356d1eaf10de0))


### 🐞 Bug Fixes

* **issue-149:** update email validation on input change ([#237](https://github.com/GoogleCloudPlatform/avocano/issues/237)) ([a4ebdc8](https://github.com/GoogleCloudPlatform/avocano/commit/a4ebdc80a90e44b119bc590e398ca3a01130e853))
* **minor:** formatting shell script ([#239](https://github.com/GoogleCloudPlatform/avocano/issues/239)) ([54213d6](https://github.com/GoogleCloudPlatform/avocano/commit/54213d648ca0670e0bd3dc3518b52e5905e4d19c))

## [1.8.0](https://github.com/GoogleCloudPlatform/avocano/compare/v1.7.0...v1.8.0) (2023-05-09)


### 🥑 Features

* offer customisable billing account id option ([#222](https://github.com/GoogleCloudPlatform/avocano/issues/222)) ([c1fa873](https://github.com/GoogleCloudPlatform/avocano/commit/c1fa873fa8cecad7ea56042437249cf41bdf4630))


### 🐞 Bug Fixes

* remove startup probe ([#225](https://github.com/GoogleCloudPlatform/avocano/issues/225)) ([107ee6b](https://github.com/GoogleCloudPlatform/avocano/commit/107ee6b25944890678a21c0ebc72aa2c94a8a7e9))


### 🧹 Chores

* **deps:** pin dependencies ([#219](https://github.com/GoogleCloudPlatform/avocano/issues/219)) ([e418705](https://github.com/GoogleCloudPlatform/avocano/commit/e418705a3dc41c94c89dc4015b2f6170a8fd3976))
* use pull_request_target for GHA commenting workflow ([#227](https://github.com/GoogleCloudPlatform/avocano/issues/227)) ([447ed75](https://github.com/GoogleCloudPlatform/avocano/commit/447ed756c2d4f33fc2b4109cd5c0eec6bcb0e896))

## [1.7.0](https://github.com/GoogleCloudPlatform/avocano/compare/v1.6.0...v1.7.0) (2023-04-28)


### 🐞 Bug Fixes

* **deps:** update dependency @web/dev-server to ^0.2.0 ([#197](https://github.com/GoogleCloudPlatform/avocano/issues/197)) ([79ec5ab](https://github.com/GoogleCloudPlatform/avocano/commit/79ec5ab6e7c45f54a5c72ef171b962876528e091))
* **deps:** update dependency @web/dev-server-rollup to ^0.5.0 ([#199](https://github.com/GoogleCloudPlatform/avocano/issues/199)) ([09c3354](https://github.com/GoogleCloudPlatform/avocano/commit/09c33547a634a190d5d36951bbdb022cae22b2f3))
* **deps:** update dependency @web/rollup-plugin-html to v2 ([#200](https://github.com/GoogleCloudPlatform/avocano/issues/200)) ([9706d79](https://github.com/GoogleCloudPlatform/avocano/commit/9706d79c48c5e16d95ac5c35e978819c3a5fcf8d))
* **deps:** update dependency @web/rollup-plugin-import-meta-assets to v2 ([#201](https://github.com/GoogleCloudPlatform/avocano/issues/201)) ([3c9f2ea](https://github.com/GoogleCloudPlatform/avocano/commit/3c9f2ea546fb60b684e2da37670890cdb5122c64))
* use google_project_iam_member to manage IAM permissions ([#198](https://github.com/GoogleCloudPlatform/avocano/issues/198)) ([4323b98](https://github.com/GoogleCloudPlatform/avocano/commit/4323b9849d55e932fdd2bb7655c60662a8709a59))


### 🧹 Chores

* **deps:** bump yaml from 2.2.1 to 2.2.2 in /client ([#202](https://github.com/GoogleCloudPlatform/avocano/issues/202)) ([88e8cc8](https://github.com/GoogleCloudPlatform/avocano/commit/88e8cc858e67f279a8a4501a3c76903a460ae4f6))
* **deps:** update dependency @web/test-runner to ^0.16.0 ([#196](https://github.com/GoogleCloudPlatform/avocano/issues/196)) ([9aca854](https://github.com/GoogleCloudPlatform/avocano/commit/9aca854da1e0271f71af55bd7212e14e85dda353))
* Increase grouping and slow down scheduling of renovate ([#214](https://github.com/GoogleCloudPlatform/avocano/issues/214)) ([e0e6cb1](https://github.com/GoogleCloudPlatform/avocano/commit/e0e6cb15d2d5d92269b3cec67d43ec97e6b02a49))


### 🥑 Features

* support multiple firebase deployments ([#210](https://github.com/GoogleCloudPlatform/avocano/issues/210)) ([04364a9](https://github.com/GoogleCloudPlatform/avocano/commit/04364a9128dc6e8691e40bde6e23e3a80426c233))
* update Cloud Run Jobs to GA, remove beta references ([#203](https://github.com/GoogleCloudPlatform/avocano/issues/203)) ([8e9c623](https://github.com/GoogleCloudPlatform/avocano/commit/8e9c62368180f93d32cc0d8e5a394e4d54e4e270))

## [1.6.0](https://github.com/GoogleCloudPlatform/avocano/compare/v1.5.1...v1.6.0) (2023-04-21)

### 🥑 Features

* adding in overall loading page, show version ([#155](https://github.com/GoogleCloudPlatform/avocano/issues/155)) ([ded1ca4](https://github.com/GoogleCloudPlatform/avocano/commit/ded1ca4e75bb3261ca3c69cf23f90faef709ebd0))

### 🐞 Bug Fixes

* add migrate to default deployment method, use unattended createsuperuser ([#179](https://github.com/GoogleCloudPlatform/avocano/issues/179)) ([6e2b10d](https://github.com/GoogleCloudPlatform/avocano/commit/6e2b10dd96e097b2a55a284be9f872063ee8d334))
* get_or_create must be formatted like this to prevent django.db.utils.IntegrityError ([#193](https://github.com/GoogleCloudPlatform/avocano/issues/193)) ([659b8f9](https://github.com/GoogleCloudPlatform/avocano/commit/659b8f954e998a1a5d25de24a5db2648d14c4ad3))
* renovate matchPaths syntax ([#187](https://github.com/GoogleCloudPlatform/avocano/issues/187)) ([a4bc4df](https://github.com/GoogleCloudPlatform/avocano/commit/a4bc4df69ccabd0dc67cfeda25aa6b134f55d98e))


### 🛠️ Automation

* Add major release tags and risky automation change warning ([#176](https://github.com/GoogleCloudPlatform/avocano/issues/176)) ([0f3971a](https://github.com/GoogleCloudPlatform/avocano/commit/0f3971a52eaade466691083a671f7da4ff414f8c))


### 🧹 Chores

* declare changelog sections ([#178](https://github.com/GoogleCloudPlatform/avocano/issues/178)) ([5823927](https://github.com/GoogleCloudPlatform/avocano/commit/58239271365ff07cbf25191c606d7106d8714be8))
* **deps:** replace direct dependency on deprecated rollup-plugin-terser ([#183](https://github.com/GoogleCloudPlatform/avocano/issues/183)) ([ff3ea93](https://github.com/GoogleCloudPlatform/avocano/commit/ff3ea93da28e70ee3c21fdce17cd63ebb12ec382))
* **deps:** update dependency husky to v8 ([#189](https://github.com/GoogleCloudPlatform/avocano/issues/189)) ([b047271](https://github.com/GoogleCloudPlatform/avocano/commit/b0472712e2fc7110ea2c4e4f82c92e95a7e4c1ed))
* re-enable renovate dependency dashboard ([#184](https://github.com/GoogleCloudPlatform/avocano/issues/184)) ([52ebacf](https://github.com/GoogleCloudPlatform/avocano/commit/52ebacf61685bcc67f83834fbdb07f5507d7e3b1))



## [1.5.1](https://github.com/GoogleCloudPlatform/avocano/compare/v1.5.0...v1.5.1) (2023-04-19)


### Bug Fixes

* only call WebFont.load if there are web fonts to load ([#162](https://github.com/GoogleCloudPlatform/avocano/issues/162)) ([3232129](https://github.com/GoogleCloudPlatform/avocano/commit/3232129c85001d504c2ca4470b729bbb7ea3eaec))

## [1.5.0](https://github.com/GoogleCloudPlatform/avocano/compare/v1.4.1...v1.5.0) (2023-04-17)


### Features

* Add container annotations for title, description, and purchase_mode ([#154](https://github.com/GoogleCloudPlatform/avocano/issues/154)) ([e9c6525](https://github.com/GoogleCloudPlatform/avocano/commit/e9c6525e2ce87e019402a2ff4b0630fb2f7e3b83))
* change payment default to collect ([#150](https://github.com/GoogleCloudPlatform/avocano/issues/150)) ([b81c2f5](https://github.com/GoogleCloudPlatform/avocano/commit/b81c2f5a15423f03598c44bbc0d38d0ac26e3647))


### Bug Fixes

* correct cors issues in local development ([#160](https://github.com/GoogleCloudPlatform/avocano/issues/160)) ([88fce5b](https://github.com/GoogleCloudPlatform/avocano/commit/88fce5bf980543e48de71ff264349b3daa323435))
* make setup script idempotent ([#164](https://github.com/GoogleCloudPlatform/avocano/issues/164)) ([f443f11](https://github.com/GoogleCloudPlatform/avocano/commit/f443f11bd9ae11a07d6626fe66d996f952a14ad7))

## [1.4.1](https://github.com/GoogleCloudPlatform/avocano/compare/v1.4.0...v1.4.1) (2023-04-04)


### Bug Fixes


* correct cloudshell_host to support subdomains ([#142](https://github.com/GoogleCloudPlatform/avocano/issues/141)) ([fdb5a41](https://github.com/GoogleCloudPlatform/avocano/commit/fdb5a41affd9b78c16190d29c32e44752f1e3d18))
* add conventional commit check ([#143](https://github.com/GoogleCloudPlatform/avocano/issues/143)) ([e74cdc0](https://github.com/GoogleCloudPlatform/avocano/commit/e74cdc0ab77dd447b17dc185de24bd5bd5fa8180))

## [1.4.0](https://github.com/GoogleCloudPlatform/avocano/compare/v1.3.0...v1.4.0) (2023-03-29)


### Features

* checkout API ([#113](https://github.com/GoogleCloudPlatform/avocano/issues/113)) ([26af605](https://github.com/GoogleCloudPlatform/avocano/commit/26af6051877ffa1df1190523163cbee927a30580))
* checkout page ([#122](https://github.com/GoogleCloudPlatform/avocano/issues/122)) ([d9e078e](https://github.com/GoogleCloudPlatform/avocano/commit/d9e078e31c4c990035c423a61ab8c3ffa6a6fad7))


### Bug Fixes

* add purchase mode flag ([#123](https://github.com/GoogleCloudPlatform/avocano/issues/123)) ([0634f12](https://github.com/GoogleCloudPlatform/avocano/commit/0634f12bb6a35f5ab6c87dcecd066032146faaf2))
* ensure playwright gets test flag ([#134](https://github.com/GoogleCloudPlatform/avocano/issues/134)) ([e6080e7](https://github.com/GoogleCloudPlatform/avocano/commit/e6080e7b68c362b065e71b8c38e3580f41323d65))
* ensure storage is deployed to selected region ([#132](https://github.com/GoogleCloudPlatform/avocano/issues/132)) ([c2dbdf5](https://github.com/GoogleCloudPlatform/avocano/commit/c2dbdf5190a3a67ea01ffe61a4afcaa2ce07d5cb))

## [1.3.0](https://github.com/GoogleCloudPlatform/avocano/compare/v1.2.0...v1.3.0) (2023-03-24)


### Features

* add OpenTelemetry tracing support ([#101](https://github.com/GoogleCloudPlatform/avocano/issues/101)) ([6da95ad](https://github.com/GoogleCloudPlatform/avocano/commit/6da95ad1e42849a90f6df18171ef6a2089df8264))

## [1.2.0](https://github.com/GoogleCloudPlatform/avocano/compare/v1.1.1...v1.2.0) (2023-03-23)


### Features

* Add startup and liveness checks ([#102](https://github.com/GoogleCloudPlatform/avocano/issues/102)) ([ff3287b](https://github.com/GoogleCloudPlatform/avocano/commit/ff3287b8c3ddc21fc3a627cd79a390bda22696dd))


### Bug Fixes

* **deps:** update dependency @web/dev-server-rollup to ^0.4.0 ([#99](https://github.com/GoogleCloudPlatform/avocano/issues/99)) ([9e046b5](https://github.com/GoogleCloudPlatform/avocano/commit/9e046b51906e6d6d5ae5fa5e8f98a013a4b7eced))

## [1.1.1](https://github.com/GoogleCloudPlatform/avocano/compare/v1.1.0...v1.1.1) (2023-03-21)


### Bug Fixes

* syntax ([#111](https://github.com/GoogleCloudPlatform/avocano/issues/111)) ([67f798c](https://github.com/GoogleCloudPlatform/avocano/commit/67f798cb93d4f90186942a6c3b66dc4ba126157c))

## [1.1.0](https://github.com/GoogleCloudPlatform/avocano/compare/v1.0.0...v1.1.0) (2023-03-21)


### Features

* introduce tagged image build configuration ([#107](https://github.com/GoogleCloudPlatform/avocano/issues/107)) ([fbd91c2](https://github.com/GoogleCloudPlatform/avocano/commit/fbd91c2045df985d5e1c1177422c134528f6f096))

## 1.0.0 (2023-03-20)


### Features

* adding initial auto-label config ([#42](https://github.com/GoogleCloudPlatform/avocano/issues/42)) ([9e3bd3c](https://github.com/GoogleCloudPlatform/avocano/commit/9e3bd3cd0313cefaa8d23aacf514de8036f247dd))
* adding new workflows per repo standards ([#17](https://github.com/GoogleCloudPlatform/avocano/issues/17)) ([cbce056](https://github.com/GoogleCloudPlatform/avocano/commit/cbce056f1fce689f9e1ef8c4c61d815f65efe18c))
* init release tags ([#103](https://github.com/GoogleCloudPlatform/avocano/issues/103)) ([ad66551](https://github.com/GoogleCloudPlatform/avocano/commit/ad66551295aa54a824312ea6a6027471b4ab3713))


### Bug Fixes

* 1 - correct help text href ([#8](https://github.com/GoogleCloudPlatform/avocano/issues/8)) ([dfe728d](https://github.com/GoogleCloudPlatform/avocano/commit/dfe728d8391d2ba1857f65789db733ac9f42d97b))
* **deps:** update dependency @material/mwc-button to ^0.27.0 ([#84](https://github.com/GoogleCloudPlatform/avocano/issues/84)) ([bf2550f](https://github.com/GoogleCloudPlatform/avocano/commit/bf2550fbe68d34ad00b0c740be795a58490b9709))
* **deps:** update dependency @material/mwc-dialog to ^0.27.0 ([#85](https://github.com/GoogleCloudPlatform/avocano/issues/85)) ([b1084a9](https://github.com/GoogleCloudPlatform/avocano/commit/b1084a9bca5a527eaca5c60bf3c1b3d4f3eafe26))
* **deps:** update dependency @rollup/plugin-babel to v6 ([#92](https://github.com/GoogleCloudPlatform/avocano/issues/92)) ([fd31ab1](https://github.com/GoogleCloudPlatform/avocano/commit/fd31ab10a8a94e9e8489995d4b3f889e5869efb6))
* **deps:** update dependency @rollup/plugin-node-resolve to v15 ([#93](https://github.com/GoogleCloudPlatform/avocano/issues/93)) ([9879099](https://github.com/GoogleCloudPlatform/avocano/commit/987909963f7eec2ec0c927831e1d21ec6b281d02))
* **deps:** update dependency @rollup/plugin-replace to v5 ([#94](https://github.com/GoogleCloudPlatform/avocano/issues/94)) ([1035a92](https://github.com/GoogleCloudPlatform/avocano/commit/1035a92d3963f742bca04895e6ce6bde689e3bd7))
* **issue-39:** resolves hard refresh error and testimonial caching in client app ([#40](https://github.com/GoogleCloudPlatform/avocano/issues/40)) ([191959e](https://github.com/GoogleCloudPlatform/avocano/commit/191959e43bac1b00205c26cb2565d3f76813f225))
* releaseplease ([#104](https://github.com/GoogleCloudPlatform/avocano/issues/104)) ([da279f5](https://github.com/GoogleCloudPlatform/avocano/commit/da279f524ee8115cd5b50120b696be338e49f224))
* tiny prevent default fix when a product is purchased ([#37](https://github.com/GoogleCloudPlatform/avocano/issues/37)) ([51c2c4c](https://github.com/GoogleCloudPlatform/avocano/commit/51c2c4cd1d26cd9939ff99462b08285dd80a24b5))
