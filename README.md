# Разработчики
* Неронов Роман (логика) - ветка Roman, Roman_final
* Смолина Алина (стили) - ветка Alina
* Менкеев Александр (стили) - ветка Alexander
# Описание
1. Разработать концепцию “Рабочего стола” с разработкой 5 пользовательских режимов с разными функциями. Пользовательские режимы: Разработчик, Соразработчик, Администратор [клиники, центра], Врач, Регистратура.
2. Создать удобный и интуитивно понятный интерфейс.
3. Автоматизировать передачу выбранных данных нейросети на “Рабочий стол”.
4. Сделать страницу Входа, чтобы у каждого врача был свой профиль.
## Наименование
Рабочий стол кардиохирурга
## Предметная область
Врачи и сотрудники учреждений
Пациенты
Данные КТ
# Данные
https://app.quickdatabasediagrams.com/#/d/gM3Nav - по этой ссылке экспортируем mysql код С КОММЕНТАРИЯМИ!
https://drawsql.app/teams/frontbackend/diagrams/pirogproject - здесь финальный вид бд, по нему дописываем sql код который получили по ссылке выше. Не экспортируем с этого сайта, так как там сбиваются значения и нет комментариев.
## Общие ограничения целостности
Разграничение доступа к удалению и добавлению сотрудников(только администратор может удалять и добавлять сотрудников)
Разграничение доступа к удалению и добавлению пациентов(только врач и регистратура может удалять и добавлять пациентов)
# Пользовательские роли
* Разработчик
* Соразработчик
* Администратор
* Врач
* Регистратура
* Врач-эксперт (в планах)
## Для каждой роли - наименование, ответственность, количество пользователей в этой роли?
* Разработчик - developer (возможность добавлять данные КТ (в формате DICOM), ЭХОКГ, антропометрии пациента, клинические данные и данные анамнеза пациент; возможность расширения функций соразработчиков и врачей/экспертов.)
* Соразработчик - codeveloper (Возможность вносить "сырые" данные КТ (в формате DICOM), ЭХОКГ, антропометрии пациента, клинические данные и данные анамнеза пациента.)
* Администратор - admin (функция добавления и регулирования деятельности профилей врачей/экспертов пределах учреждения (клиники/центра))
* Врач - doctor (возможность загрузки в специальных формах  "сырых" данных КТ (в формате DICOM либо цифровые показатели, размеров и состояния аорты на различных уровнях), ЭХОКГ, антропометрии пациента, клинические данные и данные анамнеза пациент. Далее отправляет эти данные для анализа нейросети и получает заключение о наличии/отсутствии патологии или сомнительном диагнозе). Возможность добавлять пациента, редактировать его персональные данные и медицинские данные. Возможность удалять пациента.
* Регистратура - regis (возможность удаления пациента, возможность добавления пациента и его персональных данных.)

В планах:
* Врач Эксперт - expert (аналогично функциям Врача, но с более расширенными функциями: вывод данных аналитики, прогнозов. Возможность выводить размеченные данные, требующие особого внимания; Режим планирования операции и рекомендации по типу операции, выбору объема вмешательства и оптимальных вариантов решения.)
*

# UI / API
Страницы:
* страница логина
* главное меню
* личная страница врача
* список пациентов
* список сотрудников
* страница карточки пациента
* страница карточки сотрудника(просмотр/редактирование)
* страница добваления пациента
* страница добавления сотрудника

Макет: https://www.figma.com/file/NdyxD1btx1uALckRCGonDJ/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82-%D0%B4%D0%BB%D1%8F-%D1%81%D0%B1%D0%B5%D1%80%D0%B0?node-id=180%3A20
# Технологии разработки
* React
* Laravel
## Язык программирования
* Typescript
* PHP
## СУБД
MySQL
# Тестирование


docker build . -t web
docker run -it --rm -d -p 8080:80/tcp --name website web 
