package main

import (
    "log"
    "net/http"
    "github.com/gin-gonic/gin"
    "gorm.io/gorm"
)

type Patient struct {
    gorm.Model
    Name string `json:"name"`
    Email string `json:"email"`
    MedicalHistory []MedicalRecord `json:"medical_history"`
    Appointments []Appointment `json:"appointments"`
    HealthMetrics []HealthMetric `json:"health_metrics"`
}

type MedicalRecord struct {
    gorm.Model
    PatientID uint
    Type string `json:"type"`
    Description string `json:"description"`
    Date string `json:"date"`
    DoctorName string `json:"doctor_name"`
}

type Appointment struct {
    gorm.Model
    PatientID uint
    DoctorName string `json:"doctor_name"`
    DateTime string `json:"date_time"`
    Status string `json:"status"`
}

type HealthMetric struct {
    gorm.Model
    PatientID uint
    MetricType string `json:"metric_type"`
    Value float64 `json:"value"`
    Unit string `json:"unit"`
    Timestamp string `json:"timestamp"`
}

func setupRouter(db *gorm.DB) *gin.Engine {
    r := gin.Default()

    r.Use(func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        if token == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
            c.Abort()
            return
        }
        c.Next()
    })

    r.GET("/patient/:id", func(c *gin.Context) {
        var patient Patient
        if err := db.Preload("MedicalHistory").Preload("Appointments").
            Preload("HealthMetrics").First(&patient, c.Param("id")).Error; err != nil {
            c.JSON(http.StatusNotFound, gin.H{"error": "patient not found"})
            return
        }
        c.JSON(http.StatusOK, patient)
    })

    r.POST("/patient/:id/health-metrics", func(c *gin.Context) {
        var metric HealthMetric
        if err := c.ShouldBindJSON(&metric); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }
        metric.PatientID = uint(c.GetUint("id"))
        db.Create(&metric)
        c.JSON(http.StatusCreated, metric)
    })

    r.POST("/patient/:id/appointments", func(c *gin.Context) {
        var appointment Appointment
        if err := c.ShouldBindJSON(&appointment); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }
        appointment.PatientID = uint(c.GetUint("id"))
        db.Create(&appointment)
        c.JSON(http.StatusCreated, appointment)
    })

    return r
}

func main() {
    db, err := initDB()
    if err != nil {
        log.Fatal("Failed to connect to database:", err)
    }

    db.AutoMigrate(&Patient{}, &MedicalRecord{}, &Appointment{}, &HealthMetric{})

    r := setupRouter(db)
    r.Run(":8080")
}