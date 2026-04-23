export default {
    //#region Appearance Language
    "Appearance:language:CurrentLanguage:en": "En",
    "Appearance:language:CurrentLanguage:ru": "Ru",
    "Appearance:language:CurrentLanguage:de": "De",
    "Appearance:language:CurrentLanguage:kz": "Kz",
	//#endregion
	
    //#region Auth
    "Auth::Login": "Login",
    "Auth::LogOut": "Log Out",
    "Auth::PersonaReLogin": "Relogin with your account",
    "Auth::Email": "Email",
    "Auth::Register": "Register",
    "Auth::Name": "Name",
    "Auth::Password": "Password",
    "Auth::Confirmation": "Confirmation",
    "Auth::RegisterNow": "Register Now",
    "Auth::LoginNow": "Login Now",
    "Auth::OldPassword": "Old Password",
    "Auth::PasswordMustChange": "Password too old and need to be changed",
    "Auth::ChangePassword": "Change Password",
    "Auth::ServerError": "Server responsed with error",
	//#endregion
	
    //#region Server Errors
    "Server::Banned": "Вы были заблокированны",
    "Server::NeedConfirmation": "Вам требуется подтвердить регистрацию с администратором/модератором",
    "Server::Unknown": "Неизвестная серверная ошибка",
    "Server::Deny": "Нет доступа",
	//#endregion
	
    //#region User Errors
    "User::Error::SUAccessNeeded": "Нужен доступ Super-user",
    "User::Error::SUAccessDowngrade": "Уровень доступа Super-user'а не может быть понижен",
    "User::Error::RemoveYourself": "Нельзя удалить себя",
    "User::Error::NotFound": "Пользователя с этим id не найдено",
    "User::Error::PasswordNotMatch": "Логин/Пароль не совпадают",
    "User::Error::NoSessionsFound": "Сессии не найдены",
    "User::Error::AlreadyLoggedIn": "Уже подключен",
	//#endregion
	
    //#region Role Errors
    "Role::Error::DefaultRemoval": "Default роль не может быть удалена",
    "Role::Error::NotFound": "Роль с этим id не найдена",
	//#endregion
	
    //#region Admin & Settings
    "Core::Notifications": "Уведомления",
    "Admin::Condition::Token": "Токен запроса не верный",
    "Admin::PasswordCondition::HashingIncorrect": "Неизвестная ошибка хэша пароля",
    "Admin::PasswordCondition::NMatch": "Пароли не совпадают",
    "Admin::Revert": "Вернуть",
    "Admin::Save": "Сохранить",
    "Admin::Remove": "Удалить",
    "Admin::RemoveConfirm": "Вы действительно хотите удалить * *?",

    "Admin::Module::Applications": "Приложение",
    "Admin::Module::Roles": "Роли",
    "Admin::Module::Users": "Пользователи",
    "Admin::Module::List": "Список",
    "Admin::Module::Configurations": "Конфигурации",
    "Admin::Module::Logs": "Журнал событий",
    "Admin::Module::Policy": "Политики паролей",
    "Admin::Module::Access": "Доступы в системе",
    "Admin::Module::AccessGroup": "Группы доступов",
    "Admin::Module::Security": "Безопасность",
    "Admin::Module::Filesystem": "Файловая система",
    "Admin::Module::Zones": "Зоны",
    "Admin::Module::Locators": "Приемники",
    "Admin::Module::Auth": "Регистрация",

    "Admin::Table::Users::Login": "Логин",
    "Admin::Table::Users::LoginDesc": "Логин для входа в систему",
    "Admin::Table::Users::LoginCondition::Letters": "Имя может содержать только английские символы от A до Z и цифры от 0 до 9",
    "Admin::Table::Users::LoginCondition::LettersLength": "Имя должно содержать не меньше 3 и не больше 32 символов",
    "Admin::Table::Users::Name": "Имя",
    "Admin::Table::Users::NameDesc": "Имя отображаемое в интерфейсе",
    "Admin::Table::Users::NameCondition::Letters": "Имя может содержать только символы от A до Z, от А до Я, цифры от 0 до 9, специальные символы .- и пробел",
    "Admin::Table::Users::NameCondition::LettersLength": "Имя должно содержать не меньше 2 и не больше 32 символов",
    "Admin::Table::Users::NameCondition::LettersFirst": "Первый символ может содержать только от A до Z или от А до Я",
    "Admin::Table::Users::Password": "Пароль",
    "Admin::Table::Users::PasswordDesc": "Пароль для доступа в систему",
    "Admin::Table::Users::PasswordCondition::LettersLength": "Пароль должен содержать не меньше 5 и не больше 64 символов",
    "Admin::Table::Users::Email": "Почта",
    "Admin::Table::Users::EmailDesc": "Почта пользователя для дополнительной защиты",
    "Admin::Table::Users::EmailCondition::Match": "Введите правильную электронную почту",
    "Admin::Table::Users::EmailCondition::AlreadyExist": "Почта уже используется",
    "Admin::Table::Users::Configuration": "Конфигурация",
    "Admin::Table::Users::Status": "Статус",
    "Admin::Table::Users::Policy": "Политика",
    "Admin::Table::Users::Access": "Уровень доступа",
    "Admin::Table::Users::Access2": "Доступ",
    "Admin::Table::Users::AccessDesc": "Уровень доступа\nЗарегистрированный - только созданный пользователь, пользователь - активный пользователь, администратор - имеет полный доступ к системе",
    "Admin::Table::Users::AccessSelect::banned": "Заблокированный",
    "Admin::Table::Users::AccessSelect::registered": "Самозарегистрированный",
    "Admin::Table::Users::AccessSelect::guest": "Гость",
    "Admin::Table::Users::AccessSelect::user": "Пользователь",
    "Admin::Table::Users::AccessSelect::moderator": "Модератор",
    "Admin::Table::Users::AccessSelect::admin": "Администратор",
    "Admin::Table::Users::Role": "Роль",
    "Admin::Table::Users::RoleDesc": "Роль назначенная пользователю",
    "Admin::Table::Users::RoleSelect::default": "По умолчанию",
    "Admin::Table::Users::KillSessions": "Убить сессии",
    "Admin::Table::Users::KillSessionsDesc": "Убивает все сессии на всех девайсах",
    "Admin::Table::Users::KillSessionsTitle::Kill": "Убить",
    "Admin::Table::Roles::Name": "Имя",
    "Admin::Table::Roles::NameDesc": "Имя роли\nВы можете настраивать роль в модуле настроек",
    "Admin::Table::Roles::NameCondition::LettersLength": "Имя роли должно содержать не меньше 3 и не больше 32 символов",
    "Admin::Table::Roles::Description": "Описание",
    "Admin::Table::Roles::DescriptionDesc": "Описание роли",
    "Admin::Table::Roles::DescriptionCondition::LettersLength": "Описание роли должно содержать не меньше 0 и не больше 1024 символов",
    "Admin::Table::Configurations::Name": "Имя",
    "Admin::Table::Configurations::Description": "Описание",
    "Admin::Table::Logs::User": "Пользователь",
    "Admin::Table::Logs::Module": "Модуль",
    "Admin::Table::Logs::Url": "Ссылка",
    "Admin::Table::Logs::Keys": "Ключи",
    "Admin::Table::Logs::Success": "Успешно",
    "Admin::Table::Logs::Errors": "Ошибки",
    "Admin::Table::Policy::Name": "Имя",
    "Admin::Table::Policy::Min": "Min",
    "Admin::Table::Policy::Max": "Max",
    "Admin::Table::Policy::Cooldown": "Срок замены пароля",
    "Admin::Table::Policy::Notify": "Уведомление о замене",
    "Admin::Table::Policy::Attempts": "Количество попыток",
    "Admin::Table::Policy::Block": "Длительность блокировки",
    "Admin::Table::Policy::Resistance": "Resistance",
    "Admin::Table::Access::Name": "Имя",
    "Admin::Table::Access::Description": "Описание",
    "Admin::Table::AccessGroup::Name": "Имя",
    "Admin::Table::AccessGroup::Description": "Описание",
    "Admin::Table::Name": "Имя",
    "Admin::Table::User": "Пользователь",
    "Admin::Table::Configuration": "Конфигурация",
    "Admin::Table::Path": "Путь",
    "Admin::Table::MimeType": "MIME-тип",
    "Admin::Table::Encoding": "Кодировка",
    "Admin::Table::Zones::Angles": "Углы",
    "Admin::Table::Description": "Описание",
    "Admin::Table::Type": "Тип",
	//#endregion
	
    //#region Settings
    "Settings::Save": "Сохранить",
    "Settings::Mirror": "Зеркало",
    "Settings::Revert": "Вернуть",
    "Settings::Role": "Роль",
    "Settings::User": "Пользователь",
    "Settings::Is": "выбран'а",
    "Settings::InheritFrom": "наследует от *",
    "Settings::IsOverriding": "перезаписывает *",
    "Settings::HasValue": "назначен",
    "Settings::HasUser": "пользователь",
    "Settings::HasRole": "роль",
    "Settings::OverrideValue": "* перезаписывает значение на",
    "Settings::ClearOverride": "Нажмите чтобы убрать перезапись",
    "Settings::Module::Appearance": "Внешний вид",
	//#endregion
	
    //#region Tooltips
    "Settings::Module::Tooltip::Layers": "Фон",
    "Settings::Module::Tooltip::Raim": "Глобальная Навигационная Спутниковая Система",
    "Settings::Module::Tooltip::MobileADSB": "Режим навигации",
    "Settings::Module::Tooltip::Bookmarks": "Закладки",
    "Settings::Module::Tooltip::Ruler": "Линейка",
    "Settings::Module::Tooltip::DayNight" :"День/Ночь",
    "Settings::Module::Tooltip::Graticule": "Сетка",
    "Settings::Module::Tooltip::Aircraft2": "Воздушный и наземный транспорт",
    "Settings::Module::Tooltip::Aircraft": "Around",
    "Settings::Module::Tooltip::AircraftWorld": "World Wide",
    "Settings::Module::Tooltip::AircraftWorld2": "Archive",
    "Settings::Module::Tooltip::Aircraft62": "Around Cat62",
    "Settings::Module::Tooltip::Airports": "Аэропорты, вертодромы и посадочные площадки",
    "Settings::Module::Tooltip::Airways": "Воздушные трассы",
    "Settings::Module::Tooltip::Sectors": "Границы зон, районов, секторов",
	//#endregion
	
    //#region Templates
    "TemplatesRework::Port" : "Порт",
    "TemplatesRework::Aircraft": "Воздушный транспорт",
    "TemplatesRework::Airway": "Трасса",
    "TemplatesRework::Target": "Цель",
    "TemplatesRework::Sector": "Сектор",
    "TemplatesRework::Ecliptic": "Эклиптика",
    "TemplatesRework::ControlPoint": "Контрольные точки",
    "TemplatesRework::Position": "Местоположение",
    "TemplatesRework::Route": "Маршурт",
    "TemplatesRework::Track": "Путь",
    "TemplatesRework::More": "Ещё",
    "TemplatesRework::Runways": "ВПП",

    "AirwayPoints::title": "Путевые точки",
    "AirwayPoints::Loading": "Загрузка...",
	//#endregion
	
    //#region Accessibility Layers Settings
    "Settings::Table::Accessibility::LayersModule": "Модуль слоев",
    "Settings::Table::Accessibility::LayersModuleDesc": "Включает/выключает модуль слоев",
    "Settings::Table::Accessibility::LayersModuleDefault": "Значение модуля слоев по умолчанию",
    "Settings::Table::Accessibility::LayersModuleDefaultDesc": "Определяет какое состояние модуля по умолчанию",
    "Settings::Table::Accessibility::LayersModuleDefault::OsmLocal": "OSM",
    "Settings::Table::Accessibility::LayersModuleDefault::OsmDark": "OSM Dark",
    "Settings::Table::Accessibility::LayersModuleDefault::None": "Off",
    "Settings::Table::Accessibility::LayersModuleDefault::GoogleWeb": "Google",
    "Settings::Table::Accessibility::LayersModuleDefault::YandexWeb": "Яндекс",
    "Settings::Table::Accessibility::LayersModuleEnabled": "Возможные значения модуля слоев",
    "Settings::Table::Accessibility::LayersModuleEnabledDesc": "Список всех значений модуля слоев",
    "Settings::Table::Accessibility::LayersModuleEnabled::OsmLocal": "OSM",
    "Settings::Table::Accessibility::LayersModuleEnabled::OsmDark": "OSM Dark",
    "Settings::Table::Accessibility::LayersModuleEnabled::None": "Off",
    "Settings::Table::Accessibility::LayersModuleEnabled::YandexWeb": "Яндекс",
    "Settings::Table::Accessibility::LayersModuleEnabled::GoogleWeb": "Google",
	//#endregion
	
    //#region RAIM Settings
    "Settings::Table::Accessibility::RaimModule": "Модуль raim",
    "Settings::Table::Accessibility::RaimModuleDesc": "Включает/выключает модуль raim",
    "Settings::Table::Accessibility::RaimModuleDefault": "Значение по умолчанию модуля raim",
    "Settings::Table::Accessibility::RaimModuleDefaultDesc": "Определяет какое состояние модуля по умолчанию",
	//#endregion
	
    //#region Airways Settings
    "Settings::Table::Accessibility::AirwaysModule": "Модуль воздушных путей",
    "Settings::Table::Accessibility::AirwaysModuleDesc": "Включает/выключает модуль воздушных путей",
    "Settings::Table::Accessibility::AirwaysModuleDefault": "Значение по умолчанию модуля воздушных путей",
    "Settings::Table::Accessibility::AirwaysModuleDefaultDesc": "Определяет какое состояние модуля по умолчанию",
	//#endregion
	
    //#region Aircraft Modules Settings
    "Settings::Table::Accessibility::Aircraft2Module": "Модуль воздушного и наземного транспорта",
    "Settings::Table::Accessibility::Aircraft2ModuleDesc": "Включает/выключает модуль воздушного транспорта",
    "Settings::Table::Accessibility::Aircraft2ModuleDefault": "Значение по умолчанию модуля воздушного транспорта",
    "Settings::Table::Accessibility::Aircraft2ModuleDefaultDesc": "Определяет какое состояние модуля по умолчанию",
    "Settings::Table::Accessibility::Aircraft2ModuleEnabled": "Возможные значения модуля транспорта",
    "Settings::Table::Accessibility::Aircraft2ModuleEnabledDesc": "Список всех значений модуля транспорта",
	"Settings::Table::Accessibility::AircraftWorldModule": "Модуль воздушного транспорта в мире",
    "Settings::Table::Accessibility::AircraftWorldModuleDesc": "Включает/выключает модуль воздушного транспорта в мире",
    "Settings::Table::Accessibility::AircraftWorldModuleDefault": "Значение по умолчанию модуля воздушного транспорта в мире",
    "Settings::Table::Accessibility::AircraftWorldModuleDefaultDesc": "Определяет какое состояние модуля по умолчанию",
    "Settings::Table::Accessibility::AircraftWorld2Module": "Модуль воздушного транспорта в мире",
    "Settings::Table::Accessibility::AircraftWorld2ModuleDesc": "Включает/выключает модуль воздушного транспорта в мире",
    "Settings::Table::Accessibility::AircraftWorld2ModuleDefault": "Значение по умолчанию модуля воздушного транспорта в мире",
    "Settings::Table::Accessibility::AircraftWorld2ModuleDefaultDesc": "Определяет какое состояние модуля по умолчанию",
    "Settings::Table::Accessibility::Aircraft62Module": "Модуль воздушного транспорта 62",
    "Settings::Table::Accessibility::Aircraft62ModuleDesc": "Включает/выключает модуль воздушного транспорта 62",
    "Settings::Table::Accessibility::Aircraft62ModuleDefault": "Значение по умолчанию модуля воздушного транспорта 62",
    "Settings::Table::Accessibility::Aircraft62ModuleDefaultDesc": "Определяет какое состояние модуля по умолчанию",
	//#endregion
	
    //#region Mobile ADSB Settings
    "Settings::Table::Accessibility::MobileADSBModule": "Модуль мобильного АЗН",
    "Settings::Table::Accessibility::MobileADSBModuleDesc": "Включает/выключает модуль мобильного АЗН",
    "Settings::Table::Accessibility::MobileADSBModuleDefault": "Значение по умолчанию модуля мобильного АЗН",
    "Settings::Table::Accessibility::MobileADSBModuleDefaultDesc": "Определяет какое состояние модуля по умолчанию",
	//#endregion
	
    //#region Airports Settings
    "Settings::Table::Accessibility::AirportsModule": "Модуль аэродромов",
    "Settings::Table::Accessibility::AirportsModuleDesc": "Включает/выключает модуль аэродромов",
    "Settings::Table::Accessibility::AirportsModuleDefault": "Значение по умолчанию модуля аэродромов",
    "Settings::Table::Accessibility::AirportsModuleDefaultDesc": "Определяет какое состояние модуля по умолчанию",
	//#endregion
	
    //#region Sectors Settings
    "Settings::Table::Accessibility::SectorsModule": "Модуль секторов",
    "Settings::Table::Accessibility::SectorsModuleDesc": "Включает/выключает модуль секторов",
    "Settings::Table::Accessibility::SectorsModuleDefault": "Значение по умолчанию модуля секторов",
    "Settings::Table::Accessibility::SectorsModuleDefaultDesc": "Определяет какое состояние модуля по умолчанию",
	//#endregion
	
    //#region Bookmarks Settings
    "Settings::Table::Accessibility::BookmarksModule": "Модуль закладкок",
    "Settings::Table::Accessibility::BookmarksModuleDesc": "Включает/выключает модуль закладкок",
    "Settings::Table::Accessibility::BookmarksModuleDefault": "Значение по умолчанию модуля закладкок",
    "Settings::Table::Accessibility::BookmarksModuleDefaultDesc": "Определяет какое состояние модуля по умолчанию",
	//#endregion
	
    //#region Ruler Settings
    "Settings::Table::Accessibility::RulerModule": "Модуль линейки",
    "Settings::Table::Accessibility::RulerModuleDesc": "Включает/выключает модуль линейка",
    "Settings::Table::Accessibility::RulerModuleDefault": "Значение по умолчанию модуля линейки",
    "Settings::Table::Accessibility::RulerModuleDefaultDesc": "Определяет какое состояние модуля по умолчанию",
	//#endregion
	
    //#region DayNight Settings
    "Settings::Table::Accessibility::DayNightModule": "Модуль день/ночь",
    "Settings::Table::Accessibility::DayNightModuleDesc": "Включает/выключает модуль день/ночь",
    "Settings::Table::Accessibility::DayNightModuleDefault": "Значение по умолчанию модуля день/ночь",
    "Settings::Table::Accessibility::DayNightModuleDefaultDesc": "Определяет какое состояние модуля по умолчанию",
	//#endregion
	
    //#region Graticule Settings
    "Settings::Table::Accessibility::GraticuleModule": "Модуль сетка",
    "Settings::Table::Accessibility::GraticuleModuleDesc": "Включает/выключает модуль сетка",
    "Settings::Table::Accessibility::GraticuleModuleDefault": "Значение по умолчанию модуля сетки",
    "Settings::Table::Accessibility::GraticuleModuleDefaultDesc": "Определяет какое состояние модуля по умолчанию",
	//#endregion
	
    //#region Tools
    "Tools::Measure::Start": "Клик для начала измерения",
    "Tools::Measure::Continue": "Нажмите, чтобы продолжить рисовать линию",
    "TemplatesModuleBlock::More": "Посмотреть подробнее",
    "TemplatesModuleBlock::Back": "Назад",
	//#endregion
	
    //#region AircraftTrack
    "AircraftTrack::PacketLog": "Packet Log",
    "AircraftTrack::GroundSpeedChart": "График путевой скорости",
    "AircraftTrack::FlightLevelChart": "График эшелонов полета",
    "AircraftTrack::Refresh": "Обновить",
    "AircraftTrack::Refreshing": "Обновление",
    "AircraftTrack::Loading": "Загрузка",
    "AircraftTrack::GroundSpeed": "Путевая скорость",
    "AircraftTrack::FlightLevel": "Эшелон полета",
    "AircraftTrack::FlightProfile": "Профиль полета",
    "AircraftTrackPacketLog::ShowHidden": "Показать скрытое",
    "AircraftTrackPacketLog::HideInfo": "Hide Info",
    "AircraftTrackPacketLog::Limited": "Limited",
    "AircraftTrackPacketLog::Records": "Records",
    "AircraftTrackPacketLog::Of": "Of",
    "AircraftTrackPacketLog::Showing": "Showing",
    "AircraftTrackPacketLog::AddFilter": "Добавить фильтр",
    "AircraftTrackPacketLog::NoFlightData": "Нет полетных данных",
    "AircraftTrack::NoDataForChart": "No Data For Chart",
    "AircraftTrack::Time": "Время",
    "AircraftTrackPacketLog::AddFilterTitle": "Add Filter Title",
    "AircraftTrackPacketLog::Select": "Select",
    "AircraftTrackPacketLog::Less": "Less",
    "AircraftTrackPacketLog::Greater": "Greater",
    "AircraftTrackPacketLog::Contains": "Contains",
    "AircraftTrackPacketLog::Value": "Value",
    "AircraftTrackPacketLog::Placeholder": "Placeholder",
    "AircraftTrackPacketLog::Cancel": "Закрыть",
    "AircraftTrackPacketLog::Add": "Добавить",
    //#endregion

    //#  General
    "Settings::Module::General": "Общее",
    "Settings::Module::Language": "Язык",
    "Settings::Module::Theme": "Тема",
    "Settings::Module::Mouse": "Мышь",
    "Settings::Module::SideBar": "Информационная панель",
    "Settings::Module::Others": "Дополнительные настройки",

    "General::Language::EnabledLanguages": "Доступные языки",
    "General::Language::EnabledLanguages::Desc": "Список всех доступных языков",
    "General::Language::EnabledLanguages::ru": "Русский",
    "General::Language::EnabledLanguages::en": "Английский",
    "General::Language::EnabledLanguages::kz": "Казахский",
    "General::Language::CurrentLanguage": "Выбранный язык",
    "General::Language::CurrentLanguage::Button": "Язык",
    "General::Language::CurrentLanguage::Desc": "Язык который сейчас использует аппликация",    
    "General::Language::CurrentLanguage::ru": "Русский",
    "General::Language::CurrentLanguage::en": "Английский",
    "General::Language::CurrentLanguage::kz": "Казахский",

    "General::Theme::CurrentTheme": "Выбранная тема",
    "General::Theme::CurrentTheme::Desc": "Тема которой сейчас использует аппликация",
    "General::Theme::CurrentTheme::default": "Default",
    "General::Theme::CurrentTheme::cold": "Cold",
    "General::Theme::CurrentTheme::dark": "Dark",
    "General::Theme::CurrentTheme::marine": "Marine",
    "General::Theme::CurrentTheme::white": "White",
    "General::Theme::CurrentTheme::purple": "Purple",    
    
    "General::Mouse::MouseWheelOrientationEnabled": "Список ориентаций колесика мыши",
    "General::Mouse::MouseWheelOrientationEnabled::Desc": "Список всех возможных ориентаций колесика мыши",
    "General::Mouse::MouseWheelOrientationEnabled::Standart": "Стандартный",
    "General::Mouse::MouseWheelOrientationEnabled::Inverse": "Инвертированный",    
    "General::Mouse::CurrentMouseWheelOrientation": "Ориентация колесика мыши",
    "General::Mouse::CurrentMouseWheelOrientation::Desc": "Выбранная сейчас ориентация колесика мыши",
    "General::Mouse::CurrentMouseWheelOrientation::Standart": "Стандартный",
    "General::Mouse::CurrentMouseWheelOrientation::Inverse": "Инвертированный",

    "General::SideBar::SideBarExpand": "Включить боковую панель",
    "General::SideBar::SideBarExpand::Desc": "Разрешает использование боковой панели",    
    
    "General::Others::Version": "Отображение версии",
    "General::Others::Version::Desc": "Отображает версию аппликации в меню настройки",
    "General::Others::LiveUpdates": "Динамически обновлять изменения страницы",
    "General::Others::LiveUpdates::Desc": "Использовать систему событий для обновления страницы в зависимости от действий пользователя",
    //^

    //#Conditions
    "Condition::Login::Letters": "Имя может содержать только английские символы от A до Z и цифры от 0 до 9",
    "Condition::Login::LettersLength": "Имя должно содержать не меньше 3 и не больше 36 символов",
    "Condition::Name::Letters": "Имя может содержать только символы от A до Z, от А до Я, цифры от 0 до 9, специальные символы .- и пробел",
    "Condition::Name::LettersLength": "Имя должно содержать не меньше 2 и не больше 36 символов",
    "Condition::NameAccess::Letters": "Имя может содержать только символы от A до Z, от А до Я, цифры от 0 до 9, специальные символы .- и пробел",
    "Condition::NameAccess::LettersLength": "Имя должно содержать не меньше 2 и не больше 36 символов",
    "Condition::NameEx::Letters": "Имя может содержать только символы от A до Z, от А до Я, цифры от 0 до 9, специальные символы .- и пробел",
    "Condition::NameEx::LettersLength": "Имя должно содержать не меньше 2 и не больше 36 символов",
    "Condition::NameEx::LettersFirst": "Первый символ может содержать только от A до Z или от А до Я",
    "Condition::NameSpecial::Letters": "Имя может содержать только символы от A до Z, от А до Я, цифры от 0 до 9, большинство специальных символов и пробел",
    "Condition::NameSpecial::LettersLength": "Имя должно содержать не меньше 2 и не больше 36 символов",    
    "Condition::Text::LettersLength": "Поле должно содержать не меньше 0 и не больше 8192 символов",    
    "Condition::Email::Letters": "Почта",
    "Condition::Email::LettersLength": "Почта должно содержать не меньше 2 и не больше 128 символов",
    "Condition::Password::LettersLength": "Пароль должно содержать не меньше 3 и не больше 128 символов",
    "Condition::JSON::Letters": "Корректный JSON",
    //^

};