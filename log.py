import logging
import datetime


def get_logger():
    # 设置日志记录器
    logger = logging.getLogger("")
    logger.setLevel(logging.DEBUG)

    # 创建控制台处理器，并设置日志等级
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG)

    # 创建文件处理器，将日志输出到文件中
    file_handler = logging.FileHandler("app.log", mode="a", encoding="utf-8")
    file_handler.setLevel(logging.DEBUG)

    # 创建自定义格式化器
    class ColoredFormatter(logging.Formatter):
        # 定义颜色代码
        COLOR_CODES = {
            logging.DEBUG: "\033[36m",  # 青色
            logging.INFO: "\033[32m",  # 绿色
            logging.WARNING: "\033[33m",  # 黄色
            logging.ERROR: "\033[31m",  # 红色
            logging.CRITICAL: "\033[1m\033[31m"  # 粗体红色
        }

        # 在格式化字符串前面添加颜色代码和时间
        def format(self, record):
            dt = datetime.datetime.now().strftime('\x1b[32m' + '%Y-%m-%d %H:%M:%S |' + '\x1b[0m')
            color_code = self.COLOR_CODES.get(record.levelno)
            if color_code:
                record.msg = color_code + record.msg + "\033[0m"

            if record.levelno == logging.DEBUG:
                levelname = '\x1b[36m' + "DEBUG" + '\x1b[0m'
            elif record.levelno == logging.INFO:
                levelname = '\x1b[32m' + "INFO " + '\x1b[0m'
            elif record.levelno == logging.WARNING:
                levelname = '\x1b[33m' + "WARN " + '\x1b[0m'
            elif record.levelno == logging.ERROR:
                levelname = '\x1b[31m' + "ERROR" + '\x1b[0m'
            elif record.levelno == logging.CRITICAL:
                levelname = '\x1b[35m' + "CRIT " + '\x1b[0m'
            else:
                levelname = record.levelname
            message = super().format(record)
            message = message.replace(record.levelname, levelname)  # 将原日志等级名称替换为自定义颜色代码表示的日志等级名称
            return f"{dt} {message}"

    # 将自定义格式化器设置为控制台处理器的格式化器
    formatter = ColoredFormatter(fmt="%(levelname)s: %(message)s")
    console_handler.setFormatter(formatter)

    # 将控制台处理器添加到日志记录器中
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)

    return logger
