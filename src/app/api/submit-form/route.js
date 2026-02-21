// app/api/submit-form/route.js

import { sendTelegramMessage } from "@/lib/services/telegram";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // 1. Получаем и валидируем данные формы
    const formData = await request.json();
    const { name, phone, email, message, call, write, formId, timestamp } =
      formData;

    // Проверка обязательных полей (для комментариев к акции — только message)
    const missingFields = [];
    if (!formId) missingFields.push("formId");
    if (formId === "action-comment") {
      if (!message || !String(message).trim()) missingFields.push("message");
    } else {
      if (!phone) missingFields.push("phone");
    }

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Обязательные поля отсутствуют: ${missingFields.join(", ")}`,
        },
        { status: 400 },
      );
    }

    // 2. Подготавливаем данные для отправки
    const prepareTelegramData = () => {
      const configs = {
        "footer-form": {
          dataToSend: {
            name,
            phone,
            email,
            call,
            write,
            message,
            formId,
            timestamp,
          },
        },
        "contact-page-form": {
          dataToSend: {
            name,
            phone,
            email,
            call,
            write,
            message,
            formId,
            timestamp,
          },
        },
        "hero-form": {
          dataToSend: {
            name,
            phone,
            email,
            message,
            call,
            write,
            formId,
            timestamp,
          },
        },
        "transfer-page-modal": {
          dataToSend: {
            name,
            phone,
            email,
            message,
            call,
            write,
            formId,
            timestamp,
            serviceType: formData.serviceType,
          },
        },
        // Конфигурация для квиза
        "quiz-form": {
          dataToSend: {
            name,
            phone,
            email,
            message,
            call,
            write,
            formId,
            timestamp,
          },
        },
        // Новая конфигурация для блока цен
        "price-block": {
          dataToSend: {
            name,
            phone,
            email,
            message,
            call,
            write,
            formId,
            timestamp,
          },
        },
        // Комментарий к акции (имя и телефон опциональны)
        "action-comment": {
          dataToSend: {
            name: name || "",
            phone: phone || "",
            email: email || "",
            message,
            formId,
            timestamp,
          },
        },
      };

      return configs[formId] || { dataToSend: {} };
    };

    const { dataToSend } = prepareTelegramData();

    console.log("Начинаем отправку заявки в Telegram...");
    console.log("Данные для отправки:", dataToSend);

    // 3. Отправка в Telegram + MAX
    let telegramResult;
    try {
      telegramResult = await sendTelegramMessage(dataToSend);

      const responseData = {
        success: true,
        timestamp: new Date().toISOString(),
        service: {
          name: "Telegram",
          success: true,
          messageId: telegramResult?.result?.message_id,
          data: telegramResult,
        },
        formData: {
          formId,
          timestamp: timestamp || new Date().toISOString(),
          phone,
        },
        message: "Заявка успешно отправлена в Telegram",
      };

      console.log("✅ Telegram сообщение отправлено");

      return NextResponse.json(responseData, { status: 200 });
    } catch (telegramError) {
      console.error("❌ Ошибка отправки в Telegram:", telegramError);

      const responseData = {
        success: false,
        timestamp: new Date().toISOString(),
        service: {
          name: "Telegram",
          success: false,
          error: telegramError.message || "Неизвестная ошибка Telegram",
        },
        formData: {
          formId,
          timestamp: timestamp || new Date().toISOString(),
          phone,
        },
        message: "Не удалось отправить заявку в Telegram",
      };

      return NextResponse.json(responseData, { status: 500 });
    }
  } catch (error) {
    // 4. Обработка неожиданных ошибок
    console.error("💥 Критическая ошибка обработки формы:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Внутренняя ошибка сервера при обработке запроса",
        details:
          process.env.NODE_ENV === "development"
            ? { message: error.message, stack: error.stack }
            : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
