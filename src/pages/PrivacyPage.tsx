// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import {
  ArrowLeft,
  Building2,
  CircleCheck,
  Clock,
  Cookie,
  Info,
  Lock,
  Mail,
  Scale,
  Server,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { useSite } from "../context/SiteContext";

export const PrivacyPage = () => {
  const { navigateTo: n } = useSite();
  return (
    <div className="bg-[color:var(--card)] min-h-screen text-[color:var(--ink)] selection:bg-[color:var(--tint)] selection:text-[color:var(--ink)] pb-24">
      <div className="bg-[color:var(--card)] border-b border-[color:var(--card-border)] sticky top-16 z-30 shadow-2xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            id="privacy-back-home-btn"
            onClick={() => n("index")}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>На головну</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-semibold bg-[color:var(--tint)] text-[color:var(--accent-green)] border border-[color:var(--card-border)]">
              <ShieldCheck className="w-3.5 h-3.5 text-[color:var(--accent-green)]" />
              <span>Офіційний документ</span>
            </span>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-[color:var(--card)] rounded-3xl border border-[color:var(--card-border)] p-8 sm:p-12 shadow-xs space-y-10">
          <div className="border-b border-[color:var(--card-border)] pb-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-semibold bg-[color:var(--tint)] text-[color:var(--ink)]">
                <Lock className="w-3.5 h-3.5 text-[color:var(--ink-soft)]" />
                <span>Юридичний документ</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-semibold bg-[color:var(--tint)] text-[color:var(--accent-green)] border border-[color:var(--card-border)]">
                <ShieldCheck className="w-3.5 h-3.5 text-[color:var(--accent-green)]" />
                <span>{"GDPR & ЗУ № 2297-VI Compliant"}</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[color:var(--ink)] sm:tracking-tight leading-tight">
              Політика конфіденційності та обробки персональних даних
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[color:var(--muted)] mt-3">
              <span>Редакція від: 2025 рік</span>
              <span>•</span>
              <span>Сайт: pointb.com.ua</span>
              <span>•</span>
              <span className="text-[color:var(--accent-green)] font-mono font-normal uppercase tracking-wider text-[13px]">
                Статус: офіційна чинна редакція
              </span>
            </div>
          </div>
          <div className="space-y-8 text-base text-[color:var(--ink-soft)] leading-relaxed">
            <section id="sec-1" className="space-y-3 scroll-mt-28">
              <div className="flex items-center gap-2 text-base font-bold text-[color:var(--ink)] border-b border-[color:var(--card-border)] pb-2">
                <Building2 className="w-4 h-4 text-[color:var(--accent-green)]" />
                <h2>
                  1. Загальні положення та реквізити Володільця персональних
                  даних
                </h2>
              </div>
              <p>
                Ця Політика конфіденційності (надалі — «Політика») визначає
                порядок збирання, реєстрації, накопичення, зберігання,
                адаптування, зміни, поновлення, використання і поширення
                (розповсюдження, реалізації, передачі), знеособлення, знищення
                персональних даних (надалі — «Обробка») користувачів веб-сайту
                Point B Group.
              </p>
              <p>
                Володільцем персональних даних у розумінні Закону України «Про
                захист персональних даних» № 2297-VI та Контролером (Data
                Controller) за змістом Загального регламенту про захист даних
                (EU General Data Protection Regulation 2016/679, GDPR) є:
              </p>
              <div className="p-4 sm:p-6 rounded-2xl border bg-[color:var(--card)] border-[color:var(--card-border)]">
                <div className="flex items-center gap-2 text-[13px] font-bold text-[color:var(--accent-green)] mb-3 uppercase tracking-wider">
                  <CircleCheck className="w-4 h-4 text-[color:var(--accent-green)]" />
                  <span>Офіційні реквізити суб'єкта господарювання:</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] sm:text-base">
                  <div className="space-y-2">
                    <div>
                      <span className="text-[color:var(--muted)] block text-[13px]">
                        Суб'єкт господарювання:
                      </span>
                      <strong className="text-[color:var(--ink)] font-bold text-base">
                        ФОП Кошовий Лев Олександрович
                      </strong>
                    </div>
                    <div>
                      <span className="text-[color:var(--muted)] block text-[13px]">
                        Ідентифікаційний код (ЄДРПОУ / ІПН):
                      </span>
                      <span className="font-mono font-bold text-[color:var(--ink)]">
                        3722211170
                      </span>
                    </div>
                    <div>
                      <span className="text-[color:var(--muted)] block text-[13px]">
                        Система оподаткування:
                      </span>
                      <span className="text-[color:var(--ink)] font-medium">
                        Платник єдиного податку (ІІ група) Без ПДВ
                      </span>
                    </div>
                    <div>
                      <span className="text-[color:var(--muted)] block text-[13px]">
                        Контактний телефон:
                      </span>
                      <a
                        href="tel:+380737860040"
                        className="font-semibold text-[color:var(--accent-green)] hover:underline"
                      >
                        +38 073 786 00 40
                      </a>
                    </div>
                    <div>
                      <span className="text-[color:var(--muted)] block text-[13px]">
                        Електронна пошта:
                      </span>
                      <a
                        href="mailto:point.b.here@gmail.com"
                        className="font-semibold text-[color:var(--accent-green)] hover:underline"
                      >
                        point.b.here@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-[color:var(--muted)] block text-[13px]">
                        Поточний рахунок (IBAN):
                      </span>
                      <span className="font-mono font-bold text-[color:var(--ink)] break-all select-all">
                        UA383220010000026007320074338
                      </span>
                    </div>
                    <div>
                      <span className="text-[color:var(--muted)] block text-[13px]">
                        Обслуговуючий банк:
                      </span>
                      <span className="text-[color:var(--ink)] font-medium">
                        АТ «УНІВЕРСАЛ БАНК»
                      </span>
                    </div>
                    <div>
                      <span className="text-[color:var(--muted)] block text-[13px]">
                        Офіційна податкова адреса реєстрації:
                      </span>
                      <span className="text-[color:var(--ink)] font-medium leading-snug block">
                        49001, Дніпропетровська обл., м. Дніпро, Шевченківський
                        р-н, вул. Виконкомівська, буд. 87
                      </span>
                    </div>
                    <div>
                      <span className="text-[color:var(--muted)] block text-[13px]">
                        Відповідальна особа за захист даних:
                      </span>
                      <span className="text-[color:var(--ink)] font-medium">
                        Кошовий Л. О.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section id="sec-2" className="space-y-3">
              <div className="flex items-center gap-2 text-base font-bold text-[color:var(--ink)] border-b border-[color:var(--card-border)] pb-2">
                <UserCheck className="w-4 h-4 text-[color:var(--accent-green)]" />
                <h2>2. Категорії персональних даних, які ми збираємо</h2>
              </div>
              <p>
                Ми збираємо та обробляємо персональні дані виключно в обсязі,
                мінімально необхідному для досягнення цілей цієї Політики
                (принцип мінімізації даних):
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-[13px] sm:text-base">
                <li>
                  <strong className="text-[color:var(--ink)]">
                    Ідентифікаційні та контактні дані:
                  </strong>
                  {
                    " ім’я, прізвище контактної особи, номер телефону, адреса електронної пошти, нікнейм у месенджерах (Telegram, Viber)."
                  }
                </li>
                <li>
                  <strong className="text-[color:var(--ink)]">
                    Відомості про бізнес-проєкт:
                  </strong>
                  {
                    " назва компанії або бренду, сфера діяльності, орієнтовна кількість робочих місць менеджерів, поточні програмні рішення, що використовуються, та текстові коментарі до технічного завдання."
                  }
                </li>
                <li>
                  <strong className="text-[color:var(--ink)]">
                    Технічні та мережеві метадані:
                  </strong>
                  {
                    " файли cookie, IP-адреса відвідувача, параметри браузера та операційної системи, часові мітки сесії, джерело переходу на сайт (UTM-мітки рекламних кампаній)."
                  }
                </li>
              </ul>
              <div className="p-3.5 rounded-xl bg-[color:var(--tint)] text-[13px] text-[color:var(--ink-soft)] flex items-start gap-2">
                <Info className="w-4 h-4 text-[color:var(--muted)] shrink-0 mt-0.5" />
                <span>
                  <strong>Спеціальні категорії даних:</strong>
                  {" Point B Group у жодному разі "}
                  <strong>НЕ</strong>
                  {
                    " збирає та не обробляє персональні дані про расове або етнічне походження, політичні погляди, релігійні переконання, стан здоров’я, біометричні або генетичні дані."
                  }
                </span>
              </div>
            </section>
            <section id="sec-3" className="space-y-3 scroll-mt-28">
              <div className="flex items-center gap-2 text-base font-bold text-[color:var(--ink)] border-b border-[color:var(--card-border)] pb-2">
                <Scale className="w-4 h-4 text-[color:var(--accent-green)]" />
                <h2>3. Правові підстави обробки персональних даних</h2>
              </div>
              <p>
                Обробка персональних даних користувачів здійснюється виключно за
                наявності хоча б однієї з таких законних підстав:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div className="p-4 rounded-xl bg-[color:var(--card)] border border-[color:var(--card-border)]">
                  <div className="text-[13px] font-bold text-[color:var(--accent-green)] mb-1">
                    Згода (Consent)
                  </div>
                  <div className="text-[13px] font-semibold text-[color:var(--ink)] mb-1.5">
                    ст. 6(1)(a) GDPR, ст. 11 ЗУ
                  </div>
                  <p className="text-base text-[color:var(--ink-soft)]">
                    Добровільна, конкретна, поінформована та однозначна згода
                    користувача при заповненні форми заявки або активації
                    cookie.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[color:var(--card)] border border-[color:var(--card-border)]">
                  <div className="text-[13px] font-bold text-[color:var(--accent-green)] mb-1">
                    Договірні заходи
                  </div>
                  <div className="text-[13px] font-semibold text-[color:var(--ink)] mb-1.5">
                    ст. 6(1)(b) GDPR, ст. 11 ЗУ
                  </div>
                  <p className="text-base text-[color:var(--ink-soft)]">
                    Необхідність вжиття дій за ініціативою суб'єкта даних до
                    укладення договору (проведення аудиту, розрахунок
                    кошторису).
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[color:var(--card)] border border-[color:var(--card-border)]">
                  <div className="text-[13px] font-bold text-[color:var(--accent-green)] mb-1">
                    Законний інтерес
                  </div>
                  <div className="text-[13px] font-semibold text-[color:var(--ink)] mb-1.5">
                    ст. 6(1)(f) GDPR
                  </div>
                  <p className="text-base text-[color:var(--ink-soft)]">
                    Захист веб-ресурсу від зловмисних дій, спаму, забезпечення
                    кібербезпеки та належної роботи сайту.
                  </p>
                </div>
              </div>
            </section>
            <section id="sec-4" className="space-y-3">
              <div className="flex items-center gap-2 text-base font-bold text-[color:var(--ink)] border-b border-[color:var(--card-border)] pb-2">
                <CircleCheck className="w-4 h-4 text-[color:var(--accent-green)]" />
                <h2>4. Мета (цілі) використання персональних даних</h2>
              </div>
              <p>Ми використовуємо зібрану інформацію для:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-[13px] sm:text-base">
                <li>
                  Первинного зв’язку з користувачем, уточнення деталей
                  бізнес-завдань та проведення вступної діагностичної сесії;
                </li>
                <li>
                  Підготовки індивідуального плану впровадження keyCRM,
                  проєктування архітектури чат-ботів та розрахунку наскрізної
                  аналітики;
                </li>
                <li>
                  Укладення та виконання Договору про нерозголошення (NDA) та
                  офіційного договору про надання послуг;
                </li>
                <li>
                  Надання консультаційної та технічної підтримки під час
                  співпраці;
                </li>
                <li>
                  Покращення зручності сайту, аналізу поведінкових факторів та
                  релевантності інформаційних матеріалів.
                </li>
              </ul>
            </section>
            <section id="sec-5" className="space-y-3 scroll-mt-28">
              <div className="flex items-center gap-2 text-base font-bold text-[color:var(--ink)] border-b border-[color:var(--card-border)] pb-2">
                <Clock className="w-4 h-4 text-[color:var(--accent-green)]" />
                <h2>
                  5. Термін зберігання персональних даних (Data Retention)
                </h2>
              </div>
              <p>
                Персональні дані зберігаються відповідно до принципу обмеження
                зберігання та цілей надання послуг:
              </p>
              <div className="p-4 sm:p-5 rounded-2xl border bg-[color:var(--card)] border-[color:var(--card-border)] space-y-3">
                <div className="flex items-center gap-2 text-[13px] font-bold text-[color:var(--accent-green)] uppercase tracking-wider">
                  <CircleCheck className="w-4 h-4 text-[color:var(--accent-green)]" />
                  <span>Політика зберігання та клієнтської історії:</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[color:var(--tint)] border border-[color:var(--card-border)] text-base sm:text-base text-[color:var(--ink)] leading-relaxed font-medium">
                  «Дані заявки та історія співпраці зберігаються безстроково, як
                  частина клієнтської історії Point B Group. Користувач може в
                  будь-який момент звернутися з проханням видалити свої дані —
                  див. розділ 7 та розділ 9.»
                </div>
                <ul className="space-y-2 text-[13px] sm:text-base text-[color:var(--ink-soft)] pt-1">
                  <li>
                    <strong className="text-[color:var(--ink)]">
                      • Клієнтська історія та проєктні дані:
                    </strong>
                    {
                      " зберігаються безстроково для забезпечення можливості повторного звернення, подальшого розвитку систем автоматизації, аудиту налаштувань, консультацій та масштабування рішень."
                    }
                  </li>
                  <li>
                    <strong className="text-[color:var(--ink)]">
                      • Право на видалення за запитом:
                    </strong>
                    {
                      " користувач (замовник) має право у будь-який час вимагати видалення своїх персональних даних або відкликати надану згоду на їхню обробку. Запит розглядається без затримок (див. розділ 7 та розділ 9)."
                    }
                  </li>
                  <li>
                    <strong className="text-[color:var(--ink)]">
                      • Первинна фінансова документація:
                    </strong>
                    {
                      " акти наданих послуг та розрахункові документи зберігаються протягом обов'язкових строків, передбачених чинним Податковим кодексом України (не менше 3–5 років)."
                    }
                  </li>
                </ul>
              </div>
            </section>
            <section id="sec-6" className="space-y-3 scroll-mt-28">
              <div className="flex items-center gap-2 text-base font-bold text-[color:var(--ink)] border-b border-[color:var(--card-border)] pb-2">
                <Server className="w-4 h-4 text-[color:var(--accent-green)]" />
                <h2>
                  6. Сторонні сервіси та субпідрядники (Технічні процесори
                  даних)
                </h2>
              </div>
              <p>
                Для забезпечення безперебійної технічної роботи сайту,
                комунікації та ведення проєктів ми використовуємо надійні хмарні
                сервіси та провайдери. Point B Group передає лише ті відомості,
                які технічно необхідні кожному окремому сервісу:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                <div className="p-4 rounded-xl bg-[color:var(--card)] border border-[color:var(--card-border)]">
                  <div className="font-bold text-[13px] text-[color:var(--ink)] mb-1">
                    keyCRM (ТОВ «кей СРМ»)
                  </div>
                  <div className="text-[13px] text-[color:var(--accent-green)] font-medium mb-1">
                    Хмарна CRM-система
                  </div>
                  <p className="text-base text-[color:var(--ink-soft)] leading-relaxed">
                    Облік вхідних заявок, ведення воронок переговорів, історія
                    контактів із клієнтами. Сервери розміщені в захищених
                    європейських дата-центрах.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[color:var(--card)] border border-[color:var(--card-border)]">
                  <div className="font-bold text-[13px] text-[color:var(--ink)] mb-1">
                    Telegram Bot API (Telegram FZ-LLC)
                  </div>
                  <div className="text-[13px] text-[color:var(--accent-green)] font-medium mb-1">
                    Канал сповіщень та чат-боти
                  </div>
                  <p className="text-base text-[color:var(--ink-soft)] leading-relaxed">
                    Миттєве технічне сповіщення команди про нові заявки та
                    інтерактивна комунікація через чат-ботів.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[color:var(--card)] border border-[color:var(--card-border)]">
                  <div className="font-bold text-[13px] text-[color:var(--ink)] mb-1">
                    Meta / Instagram (Meta Platforms)
                  </div>
                  <div className="text-[13px] text-[color:var(--accent-green)] font-medium mb-1">
                    Instagram Direct / Facebook Messenger
                  </div>
                  <p className="text-base text-[color:var(--ink-soft)] leading-relaxed">
                    Обробка звернень користувачів з Instagram та Facebook у разі
                    комунікації через соціальні мережі.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[color:var(--card)] border border-[color:var(--card-border)]">
                  <div className="font-bold text-[13px] text-[color:var(--ink)] mb-1">
                    Ringostat (ТОВ «Рінгостат»)
                  </div>
                  <div className="text-[13px] text-[color:var(--accent-green)] font-medium mb-1">
                    IP-телефонія та кол-трекінг
                  </div>
                  <p className="text-base text-[color:var(--ink-soft)] leading-relaxed">
                    Маршрутизація телефонних дзвінків, аналітика звернень та
                    контроль якості консультацій замовників.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[color:var(--card)] border border-[color:var(--card-border)]">
                  <div className="font-bold text-[13px] text-[color:var(--ink)] mb-1">
                    {"Google Cloud & Analytics (Google Ireland)"}
                  </div>
                  <div className="text-[13px] text-[color:var(--accent-green)] font-medium mb-1">
                    Хмарна інфраструктура та вебаналітика
                  </div>
                  <p className="text-base text-[color:var(--ink-soft)] leading-relaxed">
                    Хмарне розміщення веб-застосунку та знеособлена аналітика
                    відвідуваності з анонімізацією IP-адрес.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[color:var(--card)] border border-[color:var(--card-border)]">
                  <div className="font-bold text-[13px] text-[color:var(--ink)] mb-1">
                    Notion (Notion Labs, Inc.)
                  </div>
                  <div className="text-[13px] text-[color:var(--accent-green)] font-medium mb-1">
                    База знань та документація проєктів
                  </div>
                  <p className="text-base text-[color:var(--ink-soft)] leading-relaxed">
                    Ведення внутрішньої проєктної документації, опис
                    бізнес-процесів клієнтів та регламентів інтеграції.
                  </p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[color:var(--tint)] border border-[color:var(--card-border)] text-[13px] text-[color:var(--ink)] flex items-start gap-2 mt-2">
                <ShieldCheck className="w-4 h-4 text-[color:var(--accent-green)] shrink-0 mt-0.5" />
                <span>
                  <strong>Сувора заборона продажу:</strong>
                  {
                    " Point B Group за жодних умов не здійснює продаж, здачу в оренду чи передачу контактних баз третім особам для спам-розсилок або холодного маркетингу."
                  }
                </span>
              </div>
            </section>
            <section id="sec-7" className="space-y-3 scroll-mt-28">
              <div className="flex items-center gap-2 text-base font-bold text-[color:var(--ink)] border-b border-[color:var(--card-border)] pb-2">
                <Scale className="w-4 h-4 text-[color:var(--accent-green)]" />
                <h2>
                  {
                    "7. Повний перелік прав користувача (GDPR & ст. 8 ЗУ № 2297-VI)"
                  }
                </h2>
              </div>
              <p>
                Кожен суб’єкт персональних даних має повний спектр гарантованих
                законом прав щодо своїх відомостей:
              </p>
              <div className="space-y-2.5 pt-1 text-[13px] sm:text-base">
                <div className="p-3 rounded-xl bg-[color:var(--card)] border border-[color:var(--card-border)] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[color:var(--btn-dark)] text-[color:var(--on-dark)] font-bold text-[13px] flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-[color:var(--ink)]">
                      Право на доступ (Right of Access, ст. 15 GDPR):
                    </strong>
                    {
                      " ви маєте право знати, чи обробляються ваші дані, та отримати копію всіх збережених відомостей."
                    }
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[color:var(--card)] border border-[color:var(--card-border)] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[color:var(--btn-dark)] text-[color:var(--on-dark)] font-bold text-[13px] flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-[color:var(--ink)]">
                      Право на виправлення (Right to Rectification, ст. 16
                      GDPR):
                    </strong>
                    {
                      " право вимагати негайного виправлення застарілих або неточних даних."
                    }
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[color:var(--card)] border border-[color:var(--card-border)] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[color:var(--btn-dark)] text-[color:var(--on-dark)] font-bold text-[13px] flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-[color:var(--ink)]">
                      Право на видалення / «Право бути забутим» (Right to
                      Erasure, ст. 17 GDPR):
                    </strong>
                    {
                      " ви можете вимагати повного видалення ваших даних, якщо відсутня інша законна підстава для їхнього збереження."
                    }
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[color:var(--card)] border border-[color:var(--card-border)] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[color:var(--btn-dark)] text-[color:var(--on-dark)] font-bold text-[13px] flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <strong className="text-[color:var(--ink)]">
                      Право на обмеження обробки (Right to Restriction, ст. 18
                      GDPR):
                    </strong>
                    {
                      " право тимчасово зупинити активну обробку даних на час розгляду вашого звернення."
                    }
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[color:var(--card)] border border-[color:var(--card-border)] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[color:var(--btn-dark)] text-[color:var(--on-dark)] font-bold text-[13px] flex items-center justify-center shrink-0 mt-0.5">
                    5
                  </span>
                  <div>
                    <strong className="text-[color:var(--ink)]">
                      Право на портативність даних (Right to Data Portability,
                      ст. 20 GDPR):
                    </strong>
                    {
                      " право отримати свої дані у структурованому машинозчитуваному форматі (JSON/CSV) для передачі іншому постачальнику."
                    }
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[color:var(--card)] border border-[color:var(--card-border)] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[color:var(--btn-dark)] text-[color:var(--on-dark)] font-bold text-[13px] flex items-center justify-center shrink-0 mt-0.5">
                    6
                  </span>
                  <div>
                    <strong className="text-[color:var(--ink)]">
                      Право на заперечення (Right to Object, ст. 21 GDPR):
                    </strong>
                    {
                      " ви маєте право в будь-який момент заперечити проти обробки ваших даних з мотивів, що стосуються вашої конкретної ситуації."
                    }
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[color:var(--card)] border border-[color:var(--card-border)] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[color:var(--btn-dark)] text-[color:var(--on-dark)] font-bold text-[13px] flex items-center justify-center shrink-0 mt-0.5">
                    7
                  </span>
                  <div>
                    <strong className="text-[color:var(--ink)]">
                      Право на відкликання згоди (Withdraw Consent):
                    </strong>
                    {
                      " якщо обробка базується на згоді, ви можете відкликати її в будь-який момент простим листом на email."
                    }
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[color:var(--tint)] border border-[color:var(--card-border)] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[color:var(--accent-green)] text-[color:var(--on-dark)] font-bold text-[13px] flex items-center justify-center shrink-0 mt-0.5">
                    8
                  </span>
                  <div className="space-y-1">
                    <strong className="text-[color:var(--ink)]">
                      Право на звернення зі скаргою до наглядового органу:
                    </strong>
                    <p className="text-base text-[color:var(--ink-soft)]">
                      Якщо ви вважаєте, що ваші права порушено, ви маєте пряме
                      право звернутися до наглядового органу:
                    </p>
                    <ul className="text-[13px] text-[color:var(--ink-soft)] space-y-1 pt-1 list-disc list-inside">
                      <li>
                        <strong>В Україні:</strong>
                        {
                          " Уповноважений Верховної Ради України з прав людини (Департамент у сфері захисту персональних даних). Адреса: 01008, м. Київ, вул. Інститутська, 21/8; Гаряча лінія: 0800-50-17-20; Ел. пошта:"
                        }{" "}
                        <a
                          href="mailto:hotline@ombudsman.gov.ua"
                          className="text-[color:var(--accent-green)] font-semibold underline"
                        >
                          hotline@ombudsman.gov.ua
                        </a>
                        .
                      </li>
                      <li>
                        <strong>У країнах Європейського Союзу:</strong>
                        {
                          " до відповідного національного органу нагляду за захистом персональних даних (National Data Protection Authority) за місцем вашого звичайного перебування."
                        }
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            <section id="sec-8" className="space-y-3 scroll-mt-28">
              <div className="flex items-center gap-2 text-base font-bold text-[color:var(--ink)] border-b border-[color:var(--card-border)] pb-2">
                <Cookie className="w-4 h-4 text-[color:var(--accent-green)]" />
                <h2>8. Опис механізмів отримання згоди на сайті</h2>
              </div>
              <p>
                Згода користувача є добровільним волевиявленням та фіксується за
                допомогою таких технічних механізмів сайту:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-[color:var(--card)] border border-[color:var(--card-border)]">
                  <div className="flex items-center gap-2 mb-2">
                    <CircleCheck className="w-4 h-4 text-[color:var(--accent-green)]" />
                    <h3 className="font-bold text-[13px] text-[color:var(--ink)]">
                      Форми зворотного зв'язку та заявок
                    </h3>
                  </div>
                  <p className="text-base text-[color:var(--ink-soft)] leading-relaxed">
                    Під кожною формою заявки (на головній сторінці, у шапці та у
                    модальному вікні) розміщено пряме роз'яснення та
                    інтерактивне посилання на цю Політику. Натискання кнопки
                    «Отримати план автоматизації» або «Обговорити проєкт»
                    засвідчує пряму ствердну дію користувача щодо надання згоди
                    на обробку наданих контактних відомостей для цілей
                    консультації.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[color:var(--card)] border border-[color:var(--card-border)]">
                  <div className="flex items-center gap-2 mb-2">
                    <Cookie className="w-4 h-4 text-[color:var(--accent-green)]" />
                    <h3 className="font-bold text-[13px] text-[color:var(--ink)]">
                      Cookie-повідомлення (Банер cookies)
                    </h3>
                  </div>
                  <p className="text-base text-[color:var(--ink-soft)] leading-relaxed">
                    При першому відвідуванні сайту користувачеві відображається
                    інформаційне cookie-повідомлення. Користувач може прийняти
                    або відхилити необов’язкові аналітичні cookies або
                    налаштувати роботу з cookie-файлами у своєму браузері в
                    будь-який час.
                  </p>
                </div>
              </div>
            </section>
            <section id="sec-9" className="space-y-3">
              <div className="flex items-center gap-2 text-base font-bold text-[color:var(--ink)] border-b border-[color:var(--card-border)] pb-2">
                <Mail className="w-4 h-4 text-[color:var(--accent-green)]" />
                <h2>9. Порядок реалізації прав та контактні відомості</h2>
              </div>
              <p>
                Для реалізації будь-якого з ваших прав (наприклад, для отримання
                виписки даних або їх видалення) надішліть письмовий запит на
                офіційну електронну адресу:{" "}
                <a
                  href="mailto:point.b.here@gmail.com"
                  className="font-bold text-[color:var(--accent-green)] underline"
                >
                  point.b.here@gmail.com
                </a>
                .
              </p>
              <p className="text-base text-[color:var(--ink-soft)]">
                {"Запит розглядається протягом не більше "}
                <strong>10 робочих днів</strong>
                {
                  " (та не пізніше 30 календарних днів згідно зі ст. 12 GDPR). Відповідь надається безкоштовно у письмовій або електронній формі."
                }
              </p>
            </section>
          </div>
          <div className="pt-8 border-t border-[color:var(--card-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[13px] text-[color:var(--muted)]">
              Point B Group · Політика конфіденційності
            </div>
            <button
              id="privacy-bottom-back-btn"
              onClick={() => n("index")}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[color:var(--btn-dark)] text-[color:var(--on-dark)] text-[13px] font-semibold hover:bg-[color:var(--btn-dark-hover)] transition-colors cursor-pointer"
            >
              Зрозуміло, повернутися на сайт
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
